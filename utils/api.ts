const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export async function fetchRestaurants() {
    const token = getToken();
    if (!token) {
        console.error("No token found in localStorage.");
        return [];
    }

    const url = `${API_BASE_URL}/restaurants`;
    console.log("Fetching restaurants from:", url);
    
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
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
