function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="relative bg-[hsl(var(--bg-card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="absolute inset-x-0 top-0 h-2px bg-[hsl(var(--accent))] rounded-t-xl" />

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[hsl(var(--text-muted))]">
                        {title}
                    </p>
                    <p className="text-2xl font-bold mt-1 text-[hsl(var(--text))]">
                        {value}
                    </p>
                </div>

                {Icon && (
                    <div className="p-3 rounded-lg bg-[hsl(var(--accent))]/10">
                        <Icon className="w-6 h-6 text-[hsl(var(--accent))]" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatCard;
