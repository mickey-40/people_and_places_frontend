import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchRestaurants, getToken } from "../utils/api";

type Restaurant = {
    id: number;
    name: string;
    description: string;
};

export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!getToken()) {
            router.push("/login");  // ✅ Redirect to login if not authenticated
            return;
        }

        fetchRestaurants().then(setRestaurants);
    }, [router]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="border-b py-4">
                        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
