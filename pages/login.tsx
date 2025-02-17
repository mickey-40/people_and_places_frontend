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
            localStorage.setItem("token", data.token);  // ✅ Store token
            window.dispatchEvent(new Event("storage"));  // ✅ Trigger re-render event
            router.push("/");
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
                    className="w-full p-2 border rounded mb-2 text-black"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
            {/* Register Button Below the Login Form */}
            <p className="mt-4 text-gray-600">{`Don't have an account?`}</p>
            <button 
                onClick={() => router.push("/register")} 
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                Register
            </button>
        </div>
    );
}
