const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export async function fetchRestaurants() {
    // const token = getToken();
    // if (!token) {
    //     console.error("No token found in localStorage.");
    //     return [];
    // }

    const url = `${API_BASE_URL}/restaurants`;
    console.log("Fetching restaurants from:", url);
    
    
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json"                     
                },
            });
        
        console.log("Response status:", res.status);

        if (!res.ok) {
            const errorMessage = await res.text();
            console.error("Server Error:", errorMessage);
            throw new Error(`HTTP Error! Status: ${res.status}, Message: ${errorMessage}`);
        }

        const data = await res.json();
        console.log("Fetched restaurants:", data);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

export async function fetchRestaurantById(id: string) {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);  // Adjust API endpoint if needed
    if (!response.ok) {
        throw new Error("Failed to fetch restaurant details");
    }
    return response.json();
}


export const fetchReviews = async (restaurantId: number) => {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/reviews`);
    return response.json();
};

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);  // ✅ Store JWT in localStorage
    }

    return data;
};

export async function registerUser(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
}


export const logoutUser = () => {
    localStorage.removeItem("token");  // ✅ Remove JWT token on logout
};

export const getToken = () => {
    if (typeof window !== "undefined") {  // ✅ Prevents server-side error
        return localStorage.getItem("token");
    }
    return null;
};

export async function fetchUserProfile() {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.ok ? res.json() : null;
}

// User can add restaurant
export async function addRestaurant(name: string, description: string) {
    const token = getToken();  // Retrieve the stored JWT token
    if (!token) {
        throw new Error("You must be logged in to add a restaurant.");
    }

    const response = await fetch(`${API_BASE_URL}/restaurants/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // ✅ Send token for authentication
        },
        body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error adding restaurant: ${errorMessage}`);
    }

    return await response.json();
}

// User can edit restaurant
export async function editRestaurant(restaurantId: number, name: string, description: string) {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to edit a restaurant.");

    const response = await fetch(`${API_BASE_URL}/restaurants/edit/${restaurantId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error updating restaurant: ${errorMessage}`);
    }

    return await response.json();
}

// User can delete restaurant
export async function deleteRestaurant(restaurantId: number) {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to delete a restaurant.");

    const response = await fetch(`${API_BASE_URL}/restaurants/delete/${restaurantId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error deleting restaurant: ${errorMessage}`);
    }

    return await response.json();
}

// Get user's restaurants
export async function fetchUserRestaurants() {
    const token = getToken();
    if (!token) {
        console.error("⚠ No token found. Redirecting to login.");
        throw new Error("You must be logged in to view your restaurants.");
    }

    const url = `${API_BASE_URL}/restaurants/my-restaurants`;
    console.log("🔍 Fetching user restaurants from:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("🛠 Response status:", response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("❌ Server Error:", errorMessage);
            throw new Error(`Error fetching restaurants: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("🚨 Fetch error:", error);
        throw new Error("Failed to fetch user restaurants.");
    }
}

