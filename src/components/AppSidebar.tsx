
import { useState } from "react";
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
    url: "/app",
    icon: FileText,
  },
  {
    title: "Favorites",
    url: "/app",
    icon: Star,
  },
  {
    title: "Archive",
    url: "/app",
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
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200" collapsible="icon">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="font-instrument font-semibold text-xl text-gray-900 group-data-[collapsible=icon]:hidden">
            FlowSnap
          </h1>
        </div>
        
        <div className="mt-4 relative group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
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
                      className={`w-full justify-start hover:bg-orange-50 hover:text-orange-700 ${
                        isActive ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500' : ''
                      }`}
                      tooltip={item.title}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-gray-600">Folders</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-orange-100 group-data-[collapsible=icon]:hidden">
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton 
                    className="w-full justify-between hover:bg-orange-50 hover:text-orange-700"
                    tooltip={folder.name}
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-4 w-4" />
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full group-data-[collapsible=icon]:hidden">
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
            <span className="text-sm font-medium text-gray-600">Quick Actions</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700"
                  tooltip="Tags"
                >
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Tags</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700"
                  tooltip="Trash"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="font-medium">Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild
            className={`w-full justify-start hover:bg-orange-50 hover:text-orange-700 ${
              location.pathname === '/settings' ? 'bg-orange-100 text-orange-700' : ''
            }`}
            tooltip="Settings"
          >
            <Link to="/settings" className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
