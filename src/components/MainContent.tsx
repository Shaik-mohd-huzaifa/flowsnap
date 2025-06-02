
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Grid,
  List,
  MoreHorizontal,
  FileText,
  Calendar,
  Clock,
} from "lucide-react";
import { NoteCard } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";

const recentNotes = [
  {
    id: 1,
    title: "Project Planning Document",
    content: "Outlined the key milestones and deliverables for Q1 2024...",
    updatedAt: "2 hours ago",
    folder: "Work Projects",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Meeting Notes - Team Sync",
    content: "Discussed progress on current initiatives and upcoming deadlines...",
    updatedAt: "1 day ago",
    folder: "Meeting Notes",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Ideas for New Features",
    content: "Brainstorming session on potential improvements to user experience...",
    updatedAt: "3 days ago",
    folder: "Ideas",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Personal Goals 2024",
    content: "Setting objectives for personal and professional growth this year...",
    updatedAt: "1 week ago",
    folder: "Personal",
    isFavorite: false,
  },
];

export function MainContent() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (selectedNote) {
    const note = recentNotes.find(n => n.id === selectedNote);
    return (
      <main className="flex-1 flex flex-col h-screen">
        <NoteEditor 
          note={note} 
          onClose={() => setSelectedNote(null)}
        />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 p-4 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-orange-100" />
          <div>
            <h1 className="font-instrument text-2xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-600 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search all notes..."
              className="pl-10 w-64 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
            />
          </div>
          
          <div className="flex items-center border border-gray-200 rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-700 text-sm font-medium">Total Notes</p>
                  <p className="text-2xl font-bold text-orange-900">47</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Folders</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <MoreHorizontal className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Recent Notes */}
          <div className="mb-6">
            <h2 className="font-instrument text-xl font-semibold text-gray-900 mb-4">
              Recent Notes
            </h2>
            
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "space-y-3"
            }>
              {recentNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  viewMode={viewMode}
                  onClick={() => setSelectedNote(note.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
