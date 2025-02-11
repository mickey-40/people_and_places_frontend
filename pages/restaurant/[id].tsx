import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchRestaurantById } from "../../utils/api"; // Ensure this function exists in api.ts

type Restaurant = {
    id: number;
    name: string;
    description: string;
};

export default function RestaurantDetails() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return; // Ensure `id` exists before making API call

        fetchRestaurantById(id as string) // Call API to get restaurant details
            .then(setRestaurant)
            .catch((err) => console.error("Failed to fetch restaurant details", err));
    }, [id]);

    if (!restaurant) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{restaurant.description}</p>
            <button 
                onClick={() => router.push("/restaurants")} 
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Back to Restaurants
            </button>
        </div>
    );
}
