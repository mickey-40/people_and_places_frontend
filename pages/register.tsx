import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../utils/api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await registerUser(username, password);

        if (data.message === "User registered successfully") {
            router.push("/login");  // ✅ Redirect to login after successful registration
        } else {
            setError(data.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form onSubmit={handleRegister} className="bg-gray-100 p-6 rounded shadow-md w-80">
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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register; 