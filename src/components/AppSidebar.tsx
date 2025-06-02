
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
  SidebarTrigger,
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
} from "lucide-react";

const workspaceItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "My Notes",
    url: "#",
    icon: FileText,
  },
  {
    title: "Favorites",
    url: "#",
    icon: Star,
  },
  {
    title: "Archive",
    url: "#",
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

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="font-instrument font-semibold text-xl text-gray-900">
            FlowSnap
          </h1>
        </div>
        
        <div className="mt-4 relative">
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
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start hover:bg-orange-50 hover:text-orange-700 ${
                      item.isActive ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500' : ''
                    }`}
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-gray-600">Folders</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-orange-100">
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton className="w-full justify-between hover:bg-orange-50 hover:text-orange-700">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-4 w-4" />
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
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
                <SidebarMenuButton className="w-full justify-start hover:bg-orange-50 hover:text-orange-700">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Tags</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start hover:bg-orange-50 hover:text-orange-700">
                  <Trash2 className="h-4 w-4" />
                  <span className="font-medium">Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <Button variant="ghost" className="w-full justify-start hover:bg-orange-50 hover:text-orange-700">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
