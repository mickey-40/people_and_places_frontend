import { useEffect, useState } from "react";
import { addRestaurant, fetchRestaurants, getToken } from "../utils/api";
import { useRouter } from "next/router";

type Restaurant = {
    id: number;
    name: string;
    description: string;
};

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);  // ✅ Controls form visibility
    const router = useRouter();
    const isLoggedIn = Boolean(getToken());

    useEffect(() => {
        fetchRestaurants().then(setRestaurants);
    }, []);

    const handleAddRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!isLoggedIn) {
            setError("You must be logged in to add a restaurant.");
            router.push("/login");
            return;
        }

        if (!name || !description) {
            setError("Name and description are required.");
            return;
        }

        try {
            const newRestaurant = await addRestaurant(name, description);
            setRestaurants([...restaurants, { id: newRestaurant.restaurant_id, name, description }]);
            setSuccess("Restaurant added successfully!");
            setName("");
            setDescription("");
            setShowForm(false); // ✅ Hide form after successful submission
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Restaurants</h1>

            {/* Button to Show/Hide Form */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? "Cancel" : "Add a Restaurant"}
            </button>

            {/* Show Form Only If Button is Clicked */}
            {showForm && (
                <form onSubmit={handleAddRestaurant} className="mb-6 bg-gray-100 p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Add a Restaurant</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <input
                        type="text"
                        placeholder="Restaurant Name"
                        className="w-full p-2 border rounded mb-2 text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-2 border rounded mb-2 text-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
                        Submit
                    </button>
                </form>
            )}

            {/* Restaurant List */}
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
