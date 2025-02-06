import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await loginUser(username, password);

        if (data.token) {
            localStorage.setItem("token", data.token);  // ✅ Store the token
            router.push("/");  // ✅ Redirect to homepage after login
        } else {
            setError(data.message || "Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="bg-gray-100 p-6 rounded shadow-md w-80">
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
