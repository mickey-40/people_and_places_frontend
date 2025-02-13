import { useEffect, useState } from "react";
import { fetchUserRestaurants, editRestaurant, deleteRestaurant, getToken } from "../utils/api";
import { useRouter } from "next/router";

type Restaurant = {
    id: number;
    name: string;
    description: string;
};

export default function MyRestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            router.push("/login");  // Redirect if not logged in
            return;
        }
        fetchUserRestaurants().then(setRestaurants);
    }, []);

    const handleEditRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!editingRestaurant) return;

        try {
            await editRestaurant(editingRestaurant.id, name, description);
            setRestaurants((prev) =>
                prev.map((r) =>
                    r.id === editingRestaurant.id ? { ...r, name, description } : r
                )
            );
            setSuccess("Restaurant updated successfully!");
            setShowForm(false);
            setEditingRestaurant(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteRestaurant = async (restaurantId: number) => {
        if (!confirm("Are you sure you want to delete this restaurant?")) return;

        try {
            await deleteRestaurant(restaurantId);
            setRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
            setSuccess("Restaurant deleted successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My Restaurants</h1>

            {showForm && (
                <form onSubmit={handleEditRestaurant} className="mb-6 bg-gray-100 p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Edit Restaurant</h2>
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
                        Update
                    </button>
                </form>
            )}

            {/* Restaurant List */}
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="border-b py-4">
                        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                        <button
                            onClick={() => {
                                setEditingRestaurant(restaurant);
                                setName(restaurant.name);
                                setDescription(restaurant.description);
                                setShowForm(true);
                            }}
                            className="bg-yellow-500 text-white px-3 py-2 rounded mt-2 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                            className="bg-red-500 text-white px-3 py-2 rounded mt-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
