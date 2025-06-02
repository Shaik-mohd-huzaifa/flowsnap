
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface BoardData {
  [key: string]: Task[];
}

const initialBoardData: BoardData = {
  "To Do": [
    {
      id: "1",
      title: "Design landing page mockup",
      description: "Create wireframes and high-fidelity designs for the new landing page",
      assignee: "Alice Johnson",
      dueDate: "2024-06-05",
      priority: "high",
    },
    {
      id: "2",
      title: "Research competitor features",
      description: "Analyze top 5 competitors and document key features",
      assignee: "Bob Smith",
      dueDate: "2024-06-07",
      priority: "medium",
    },
  ],
  "In Progress": [
    {
      id: "3",
      title: "Implement user authentication",
      description: "Set up login, signup, and password reset functionality",
      assignee: "Charlie Brown",
      dueDate: "2024-06-06",
      priority: "high",
    },
    {
      id: "4",
      title: "Write API documentation",
      description: "Document all REST endpoints with examples and schemas",
      assignee: "Diana Prince",
      dueDate: "2024-06-08",
      priority: "low",
    },
  ],
  "Review": [
    {
      id: "5",
      title: "Code review for payment system",
      description: "Review and test the new payment integration code",
      assignee: "Eve Wilson",
      dueDate: "2024-06-04",
      priority: "high",
    },
  ],
  "Done": [
    {
      id: "6",
      title: "Set up development environment",
      description: "Configure Docker containers and CI/CD pipeline",
      assignee: "Frank Miller",
      dueDate: "2024-06-01",
      priority: "medium",
    },
    {
      id: "7",
      title: "Create project timeline",
      description: "Define milestones and deliverables for Q2",
      assignee: "Grace Lee",
      dueDate: "2024-06-02",
      priority: "low",
    },
  ],
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "medium":
      return <Circle className="h-4 w-4 text-yellow-500" />;
    case "low":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

const Board = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If no destination, return
    if (!destination) return;

    // If dropped in the same position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = boardData[source.droppableId];
    const destColumn = boardData[destination.droppableId];
    const draggedTask = sourceColumn.find(task => task.id === draggableId);

    if (!draggedTask) return;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggedTask);

      setBoardData({
        ...boardData,
        [source.droppableId]: newTasks,
      });
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(sourceColumn);
      const destTasks = Array.from(destColumn);

      sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, draggedTask);

      setBoardData({
        ...boardData,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      });
    }
  };

  const totalTasks = Object.values(boardData).reduce((sum, tasks) => sum + tasks.length, 0);
  const inProgressTasks = boardData["In Progress"].length;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 p-4 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-orange-100" />
                <div>
                  <h1 className="font-instrument text-2xl font-semibold text-gray-900">
                    Project Board
                  </h1>
                  <p className="text-gray-600 text-sm font-inter">
                    Track progress and manage tasks
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                  />
                </div>
                
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </header>

            {/* Board Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                {/* Board Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-700 text-sm font-medium">Total Tasks</p>
                        <p className="text-2xl font-bold text-orange-900">{totalTasks}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
                      </div>
                      <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Team Members</p>
                        <p className="text-2xl font-bold text-gray-900">6</p>
                      </div>
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Due This Week</p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                      </div>
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Kanban Board */}
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(boardData).map(([columnTitle, tasks]) => (
                      <div key={columnTitle} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-instrument text-lg font-semibold text-gray-900">
                            {columnTitle}
                          </h3>
                          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                            {tasks.length}
                          </span>
                        </div>
                        
                        <Droppable droppableId={columnTitle}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`space-y-3 min-h-[200px] ${
                                snapshot.isDraggingOver ? 'bg-orange-50 rounded-lg p-2' : ''
                              }`}
                            >
                              {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`${
                                        snapshot.isDragging 
                                          ? 'transform rotate-2 shadow-xl' 
                                          : 'hover:shadow-md'
                                      } transition-all duration-200`}
                                    >
                                      <Card className="bg-white shadow-sm cursor-move">
                                        <CardHeader className="pb-2">
                                          <div className="flex items-start justify-between">
                                            <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2">
                                              {task.title}
                                            </CardTitle>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                            {task.description}
                                          </p>
                                          
                                          <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                              {getPriorityIcon(task.priority)}
                                              <span className="text-gray-600">{task.assignee}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500">
                                              <Calendar className="h-3 w-3" />
                                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              
                              <Button 
                                variant="ghost" 
                                className="w-full border-2 border-dashed border-gray-300 hover:border-orange-300 hover:bg-orange-50 text-gray-500 hover:text-orange-600"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Task
                              </Button>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </div>
                </DragDropContext>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Board;
