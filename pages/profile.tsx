import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchUserProfile, getToken } from "../utils/api";

type UserProfile = {
    id: number;
    username: string;
    liked_restaurants: { id: number; name: string }[];
};

export default function Profile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!getToken()) {
            router.push("/login");  // ✅ Redirect if not logged in
            return;
        }

        fetchUserProfile().then(setUser);
    }, [router]);

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
            <h2 className="text-2xl font-semibold mb-2">Liked Restaurants</h2>
            {user.liked_restaurants.length > 0 ? (
                <ul>
                    {user.liked_restaurants.map((restaurant) => (
                        <li key={restaurant.id} className="border-b py-2">
                            {restaurant.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{`You haven't liked any restaurants yet.`}</p>
            )}
        </div>
    );
}
