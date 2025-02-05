import { AppProps } from "next/app";
import "../styles/globals.css";
import { getToken, logoutUser } from "../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(getToken());  // ✅ Fetch token after page loads
    }, []);

    const handleLogout = () => {
        logoutUser();
        setToken(null);
        router.push("/login");
    };

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex justify-between">
                <h1 className="text-lg font-bold">People and Places</h1>
                <div>
                    {token ? (
                        <>
                            <a href="/profile" className="mr-4">Profile</a>  {/* ✅ Profile Page */}
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <a href="/login" className="bg-blue-500 px-3 py-1 rounded">Login</a>
                    )}
                </div>
            </nav>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
