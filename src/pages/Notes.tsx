
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
import { useNotes } from "@/hooks/useNotes";

export default function Notes() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const { notes, isLoading, createNote } = useNotes();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedNote = selectedNoteId ? notes.find(n => n.id === selectedNoteId) : null;

  const handleCreateNewNote = () => {
    setIsCreatingNew(true);
    setSelectedNoteId(null);
  };

  const handleCloseEditor = () => {
    setIsCreatingNew(false);
    setSelectedNoteId(null);
  };

  if (selectedNote || isCreatingNew) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          <AppSidebar />
          <main className="flex-1 flex flex-col h-screen">
            <NoteEditor 
              note={selectedNote || undefined} 
              onClose={handleCloseEditor}
            />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
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
              
              <Button 
                onClick={handleCreateNewNote}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
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
                  <Button 
                    onClick={handleCreateNewNote}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
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
                      note={{
                        id: parseInt(note.id),
                        title: note.title,
                        content: note.content,
                        updatedAt: new Date(note.updated_at).toLocaleDateString(),
                        folder: "Personal",
                        isFavorite: false,
                      }}
                      viewMode={viewMode}
                      onClick={() => setSelectedNoteId(note.id)}
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
