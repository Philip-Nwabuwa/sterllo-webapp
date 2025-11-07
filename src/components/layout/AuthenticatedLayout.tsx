import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AuthenticatedLayout() {
  return (
    <div className="bg-neutral-950 relative size-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative w-full z-10">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
