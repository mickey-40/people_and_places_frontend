import { AppProps } from "next/app";
import "../styles/globals.css";
import { getToken, logoutUser } from "../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Redirect to landing page if the user is visiting the home page `/`
        if (router.pathname === "/") {
            router.push("/landing");
        }

        const handleStorageChange = () => {
            setToken(getToken()); // ✅ Update token when storage changes
        };

        window.addEventListener("storage", handleStorageChange);
        setToken(getToken());

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [router]); // ✅ Add router to dependencies so it runs when router changes

    const handleLogout = () => {
        logoutUser();
        setToken(null);
        router.push("/login");
    };

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex justify-between">
                <Link href="/landing" className="text-lg font-bold">People and Places</Link>
                <Link href="/restaurants" className="mr-4">Restaurants</Link>
                <div>
                    {token ? (
                        <>
                            <Link href="/profile" className="mr-4">Profile</Link>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
                            <Link href="/register"  className="bg-green-500 px-3 py-1 rounded">Register</Link>
                        </>
                    )}
                </div>
            </nav>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
