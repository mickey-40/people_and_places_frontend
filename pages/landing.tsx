import { useRouter } from "next/router";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to People & Places</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">
                Discover and explore amazing restaurants and share your experiences!
            </p>
            <div className="flex space-x-4">
                <button 
                    onClick={() => router.push("/login")} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-600"
                >
                    Get Started
                </button>
                <button 
                    onClick={() => router.push("/restaurants")} 
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-gray-400"
                >
                    Explore Restaurants
                </button>
            </div>
        </div>
    );
}
