import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { api } from "../utils/api";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            await api(
                `http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                }
            );

            navigate("/dashboard", { replace: true });
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-var(--accent)/5 to-transparent px-4">
            <div className="bg-var(--bg-card) rounded-2xl w-full max-w-md p-8 shadow-2xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">
                        {isSignup ? "Create your" : "Welcome to"}{" "}
                        <span className="text-var(--accent)">Deadline Slayer</span>
                    </h1>
                    <p className="text-sm text-var(--text-muted) mt-1">
                        {isSignup
                            ? "Start managing your projects effortlessly"
                            : "Log in to stay on top of your work"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignup && (
                        <div>
                            <label className="block text-sm mb-1 text-var(--text-muted)">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-var(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-var(--accent) bg-var(--bg-input)"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm mb-1 text-var(--text-muted)">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-var(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-var(--accent) bg-var(--bg-input)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-var(--text-muted)">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-var(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-var(--accent) bg-var(--bg-input)"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading && (
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        {loading
                            ? isSignup
                                ? "Creating..."
                                : "Logging in..."
                            : isSignup
                                ? "Create Account"
                                : "Login"}
                    </Button>
                </form>

                <p className="text-sm text-center text-var(--text-muted) mt-6">
                    {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-var(--accent) font-medium hover:underline"
                        type="button"
                    >
                        {isSignup ? "Login" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;