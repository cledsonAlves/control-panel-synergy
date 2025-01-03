import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-sidebar border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-sidebar-foreground">Release Manager</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/admin"
                  className="text-sidebar-foreground hover:bg-sidebar-accent px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </Link>
                <Link
                  to="/admin/generator"
                  className="text-sidebar-foreground hover:bg-sidebar-accent px-3 py-2 rounded-md text-sm font-medium"
                >
                  Release Notes Generator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};