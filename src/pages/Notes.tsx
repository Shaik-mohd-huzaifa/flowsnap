
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Grid,
  List,
  Filter,
  SortAsc,
} from "lucide-react";
import { NoteCard } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";

const allNotes = [
  {
    id: 1,
    title: "Project Planning Document",
    content: "Outlined the key milestones and deliverables for Q1 2024. This document covers all aspects of the upcoming project including timeline, resources, and expected outcomes.",
    updatedAt: "2 hours ago",
    folder: "Work Projects",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Meeting Notes - Team Sync",
    content: "Discussed progress on current initiatives and upcoming deadlines. Key points covered include sprint planning, resource allocation, and blockers.",
    updatedAt: "1 day ago",
    folder: "Meeting Notes",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Ideas for New Features",
    content: "Brainstorming session on potential improvements to user experience. Includes wireframes and user feedback analysis.",
    updatedAt: "3 days ago",
    folder: "Ideas",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Personal Goals 2024",
    content: "Setting objectives for personal and professional growth this year. Focus areas include skill development and career advancement.",
    updatedAt: "1 week ago",
    folder: "Personal",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Research Notes - AI Trends",
    content: "Comprehensive research on emerging AI technologies and their potential applications in our industry.",
    updatedAt: "2 weeks ago",
    folder: "Research",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Book Summary - The Lean Startup",
    content: "Key insights and takeaways from Eric Ries' book on building successful startups through validated learning.",
    updatedAt: "3 weeks ago",
    folder: "Learning",
    isFavorite: true,
  },
];

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedNote) {
    const note = allNotes.find(n => n.id === selectedNote);
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          <AppSidebar />
          <main className="flex-1 flex flex-col h-screen">
            <NoteEditor 
              note={note} 
              onClose={() => setSelectedNote(null)}
            />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-orange-100 dark:hover:bg-orange-900/20" />
              <div>
                <h1 className="font-instrument text-2xl font-semibold text-gray-900 dark:text-white">
                  My Notes
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {filteredNotes.length} notes
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
              
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50 dark:hover:bg-orange-900/20"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50 dark:hover:bg-orange-900/20"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
              
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No notes found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery ? "Try adjusting your search terms." : "Get started by creating your first note."}
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                  : "space-y-3"
                }>
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      viewMode={viewMode}
                      onClick={() => setSelectedNote(note.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
