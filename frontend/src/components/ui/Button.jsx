function Button({ children, variant = "primary", ...props }) {
    const base =
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98]";

    const variants = {
        primary:
            "bg-[hsl(var(--accent))] text-white hover:opacity-90",

        secondary:
            "border border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-white",

        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
    };
    return (
        <button
            {...props}
            className={`${base} ${variants[variant]}`}
        >
            {children}
        </button>
    );
}

export default Button;
