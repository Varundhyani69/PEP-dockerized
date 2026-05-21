function Modal({
    open,
    onClose,
    title,
    children,
    size = "md",
    panelClass = "",
}) {
    if (!open) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative z-10 w-full ${sizes[size]}
                    rounded-2xl p-6
                    bg-white text-gray-900
                    shadow-xl
                    animate-in fade-in-0 slide-in-from-top-2 duration-300
                    ${panelClass}
                `}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Modal;
