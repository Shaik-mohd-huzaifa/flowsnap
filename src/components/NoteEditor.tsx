
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
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
  Strikethrough,
  Type,
  Image,
  Table,
  Edit,
} from "lucide-react";
import { useNotes, Note } from "@/hooks/useNotes";

interface NoteEditorProps {
  note?: Note;
  onClose: () => void;
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "Untitled");
  const [content, setContent] = useState(note?.content || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  
  const { createNote, updateNote, isCreating, isUpdating } = useNotes();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      updateNote({
        id: note.id,
        title,
        content,
      });
    } else {
      createNote({ title, content });
    }
  };

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = content.substring(start, end);
      setSelectedText(selected);
      setSelectionStart(start);
      setSelectionEnd(end);
    }
  };

  const insertText = (before: string, after: string = "") => {
    if (selectedText) {
      const newText = content.substring(0, selectionStart) + before + selectedText + after + content.substring(selectionEnd);
      setContent(newText);
    } else {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = content.substring(0, start) + before + after + content.substring(end);
      
      setContent(newText);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, start + before.length);
      }, 0);
    }
  };

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertText("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertText("*", "*") },
    { icon: Underline, label: "Underline", action: () => insertText("<u>", "</u>") },
    { icon: Strikethrough, label: "Strikethrough", action: () => insertText("~~", "~~") },
    { icon: Code, label: "Inline Code", action: () => insertText("`", "`") },
    { icon: Quote, label: "Quote", action: () => insertText("> ") },
    { icon: List, label: "Bullet List", action: () => insertText("- ") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertText("1. ") },
    { icon: Link, label: "Link", action: () => insertText("[", "](url)") },
    { icon: Image, label: "Image", action: () => insertText("![alt text](", ")") },
    { icon: Table, label: "Table", action: () => insertText("| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n") },
    { icon: Type, label: "Heading", action: () => insertText("# ") },
  ];

  const isSaving = isCreating || isUpdating;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-orange-50 dark:hover:bg-orange-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditMode(!isEditMode)}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditMode ? "Preview" : "Edit"}
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <MoreVertical className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Formatting Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex items-center gap-1 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
        {formatButtons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/20 flex-shrink-0"
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
          className="text-3xl font-instrument font-semibold border-none p-0 mb-6 focus:ring-0 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white"
          placeholder="Untitled"
        />
        
        {isEditMode ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onSelect={handleTextSelection}
            className="flex-1 border-none p-0 resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-gray-400 dark:bg-gray-900 dark:text-white outline-none"
            placeholder="Start writing your note..."
          />
        ) : (
          <div className="flex-1 prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">{children}</code>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-orange-500 pl-4 italic">{children}</blockquote>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
              }}
            >
              {content || "Start writing your note..."}
            </ReactMarkdown>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <span>Last edited {note?.updated_at ? new Date(note.updated_at).toLocaleDateString() : "just now"}</span>
          <span>{content.length} characters</span>
        </div>
      </div>
    </div>
  );
}
