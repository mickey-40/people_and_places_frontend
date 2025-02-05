const API_BASE_URL = "http://127.0.0.1:5000";

export const fetchRestaurants = async () => {
    const response = await fetch(`${API_BASE_URL}/restaurants/`);
    return response.json();
};

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

export const fetchUserProfile = async () => {
    const token = getToken();
    if (!token) return null; // ✅ Prevent request if no token

    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // ✅ Send JWT token
        },
    });

    if (!response.ok) return null;
    return response.json();
};
