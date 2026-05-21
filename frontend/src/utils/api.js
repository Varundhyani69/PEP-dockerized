const BASE_URL = (typeof window !== "undefined" && window.env && window.env.VITE_API_URL)
    || import.meta.env.VITE_API_URL
    || "http://localhost:5000";

export const api = async (url, options = {}) => {
    let targetUrl = url;
    if (!url.startsWith("http")) {
        const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
        const path = url.startsWith("/") ? url : `/${url}`;
        targetUrl = `${base}${path}`;
    }

    const res = await fetch(targetUrl, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const text = await res.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error("Server error");
    }

    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
};