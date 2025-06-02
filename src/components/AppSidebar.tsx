
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  FolderOpen,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Tag,
  Archive,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const workspaceItems = [
  {
    title: "Home",
    url: "/app",
    icon: Home,
  },
  {
    title: "Board",
    url: "/board",
    icon: LayoutDashboard,
  },
  {
    title: "My Notes",
    url: "/notes",
    icon: FileText,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Star,
  },
  {
    title: "Archive",
    url: "/archive",
    icon: Archive,
  },
];

const folders = [
  { name: "Work Projects", count: 12 },
  { name: "Personal", count: 8 },
  { name: "Ideas", count: 15 },
  { name: "Meeting Notes", count: 6 },
];

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Check for dark mode on mount
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
  }, []);

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-700 dark:bg-gray-800" collapsible="icon">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="font-instrument font-semibold text-xl text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">
            FlowSnap
          </h1>
        </div>
        
        <div className="mt-4 relative group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500/20"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 ${
                        isActive 
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-r-2 border-orange-500' 
                          : 'dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400'
                      }`}
                      tooltip={item.title}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-3 py-2 dark:text-gray-400">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Folders</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/20 group-data-[collapsible=icon]:hidden">
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton 
                    className="w-full justify-between dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0"
                    tooltip={folder.name}
                  >
                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                      <FolderOpen className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{folder.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full group-data-[collapsible=icon]:hidden">
                      {folder.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Actions</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full justify-start dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0"
                  tooltip="Tags"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <Tag className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium group-data-[collapsible=icon]:hidden">Tags</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full justify-start dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0"
                  tooltip="Trash"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <Trash2 className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium group-data-[collapsible=icon]:hidden">Trash</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 p-4">
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild
            className={`w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 ${
              location.pathname === '/settings' 
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' 
                : 'dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400'
            }`}
            tooltip="Settings"
          >
            <Link to="/settings" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
