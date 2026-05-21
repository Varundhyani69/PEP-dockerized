import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

function Navbar() {
    return (
        <header className="h-14 bg-[hsl(var(--bg-card))] border-b border-[hsl(var(--border))] flex items-center px-6 gap-6">
            {/* Left side */}
            <div className="flex items-center gap-6 flex-1">
                <p className="text-sm font-medium text-[hsl(var(--text-muted))]">
                    Stay focused. Slay deadlines.
                </p>

                <div className="relative flex-1 max-w-xl">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-muted))]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-1.5 bg-[hsl(var(--bg-input))] border border-[hsl(var(--border))] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-var(--accent) focus:border-transparent"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <button className="p-1.5 rounded-full hover:bg-[hsl(var(--accent))]/10 transition-colors">
                    <BellIcon className="w-5 h-5 text-[hsl(var(--text-muted))] hover:text-var(--accent)" />
                </button>

                <div className="w-8 h-8 rounded-full bg-var(--accent)/20 flex items-center justify-center text-sm font-medium text-var(--accent) border border-var(--accent)/30">
                    U
                </div>
            </div>
        </header>
    );
}

export default Navbar;