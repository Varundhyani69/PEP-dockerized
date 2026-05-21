export const api = async (url, options = {}) => {
    const res = await fetch(url, {
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