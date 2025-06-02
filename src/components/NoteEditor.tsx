
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Star,
  MoreVertical,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Save,
} from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
  folder: string;
  isFavorite: boolean;
}

interface NoteEditorProps {
  note?: Note;
  onClose: () => void;
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "Untitled");
  const [content, setContent] = useState(note?.content || "");
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite || false);

  const formatButtons = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Link, label: "Link" },
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Numbered List" },
    { icon: Quote, label: "Quote" },
    { icon: Code, label: "Code" },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>in</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              {note?.folder || "Personal"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? "text-orange-500 hover:bg-orange-50" : "hover:bg-gray-100"}
          >
            <Star className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <MoreVertical className="h-4 w-4" />
          </Button>
          
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      {/* Formatting Toolbar */}
      <div className="border-b border-gray-200 p-3 flex items-center gap-1 bg-gray-50">
        {formatButtons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-orange-100"
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-instrument font-semibold border-none p-0 mb-6 focus:ring-0 placeholder:text-gray-400"
          placeholder="Untitled"
        />
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border-none p-0 resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-gray-400"
          placeholder="Start writing your note..."
        />
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <span>Last edited {note?.updatedAt || "just now"}</span>
          <span>{content.length} characters</span>
        </div>
      </div>
    </div>
  );
}
