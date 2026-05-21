import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-[hsl(var(--bg-main))] text-[hsl(var(--text))]">
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="mx-auto w-full max-w-1400px">
                        {children}
                    </div>
                </main>

                <Notification />
            </div>
        </div>
    );
}

export default DashboardLayout;