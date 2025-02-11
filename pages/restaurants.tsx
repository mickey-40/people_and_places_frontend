import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchRestaurants } from "../utils/api"; // Import the function

type Restaurant = {
    id: number;
    name: string;
    description: string;
};

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchRestaurants()
            .then(setRestaurants)  // Update state with API data
            .catch((err) => console.error("Failed to fetch restaurants", err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                        <p className="text-gray-600">{restaurant.description}</p>
                        <button
                            onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            View Details
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
