
import { Button } from "@/components/ui/button";
import { FileText, Star, MoreVertical, FolderOpen } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
  folder: string;
  isFavorite: boolean;
}

interface NoteCardProps {
  note: Note;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export function NoteCard({ note, viewMode, onClick }: NoteCardProps) {
  if (viewMode === "list") {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-instrument font-semibold text-gray-900 truncate">
                {note.title}
              </h3>
              <p className="text-gray-600 text-sm truncate">{note.content}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FolderOpen className="h-4 w-4" />
              {note.folder}
            </div>
            <span className="text-sm text-gray-500">{note.updatedAt}</span>
            <div className="flex items-center gap-1">
              {note.isFavorite && (
                <Star className="h-4 w-4 text-orange-500 fill-current" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group h-48 flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" />
          {note.isFavorite && (
            <Star className="h-4 w-4 text-orange-500 fill-current" />
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1">
        <h3 className="font-instrument font-semibold text-gray-900 mb-2 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {note.content}
        </p>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <FolderOpen className="h-3 w-3" />
          {note.folder}
        </div>
        <span className="text-xs text-gray-500">{note.updatedAt}</span>
      </div>
    </div>
  );
}
