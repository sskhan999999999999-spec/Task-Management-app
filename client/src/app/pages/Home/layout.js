import Sidebar from "@/app/components/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141]">
      
      <Sidebar />

      <main className="min-h-screen pt-16 md:ml-64 md:pt-0">
        {children}
      </main>

    </div>
  );
}