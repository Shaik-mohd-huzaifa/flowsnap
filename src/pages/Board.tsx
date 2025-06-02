import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, MoreHorizontal, Calendar, Users, Clock, CheckCircle, Circle, AlertCircle } from "lucide-react";

const initialBoardData = {
  "To Do": [
    {
      id: "1",
      title: "Design landing page mockup",
      description: "Create wireframes and high-fidelity designs for the new landing page",
      assignee: "Alice Johnson",
      dueDate: "2024-06-05",
      priority: "high"
    },
    {
      id: "2",
      title: "Research competitor features",
      description: "Analyze top 5 competitors and document key features",
      assignee: "Bob Smith",
      dueDate: "2024-06-07",
      priority: "medium"
    }
  ],
  "In Progress": [
    {
      id: "3",
      title: "Implement user authentication",
      description: "Set up login, signup, and password reset functionality",
      assignee: "Charlie Brown",
      dueDate: "2024-06-06",
      priority: "high"
    },
    {
      id: "4",
      title: "Write API documentation",
      description: "Document all REST endpoints with examples and schemas",
      assignee: "Diana Prince",
      dueDate: "2024-06-08",
      priority: "low"
    }
  ],
  "Review": [
    {
      id: "5",
      title: "Code review for payment system",
      description: "Review and test the new payment integration code",
      assignee: "Eve Wilson",
      dueDate: "2024-06-04",
      priority: "high"
    }
  ],
  "Done": [
    {
      id: "6",
      title: "Set up development environment",
      description: "Configure Docker containers and CI/CD pipeline",
      assignee: "Frank Miller",
      dueDate: "2024-06-01",
      priority: "medium"
    },
    {
      id: "7",
      title: "Create project timeline",
      description: "Define milestones and deliverables for Q2",
      assignee: "Grace Lee",
      dueDate: "2024-06-02",
      priority: "low"
    }
  ]
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
  const [boardData, setBoardData] = useState(initialBoardData);

  // Load dark mode state
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If no destination, return
    if (!destination) return;

    // If dropped in the same position, return
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = boardData[source.droppableId as keyof typeof boardData];
    const destColumn = boardData[destination.droppableId as keyof typeof boardData];
    const draggedTask = sourceColumn.find((task) => task.id === draggableId);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter transition-colors">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-800 transition-colors">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 transition-colors">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-orange-100 dark:hover:bg-orange-900/20" />
                <div>
                  <h1 className="font-instrument text-2xl font-semibold text-gray-900 dark:text-white">
                    Project Board
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
                    Track progress and manage tasks
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Total: {totalTasks}</span>
                  <span>In Progress: {inProgressTasks}</span>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </header>

            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Board Content */}
            <div className="flex-1 overflow-auto p-6">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-full">
                  {Object.entries(boardData).map(([columnId, tasks]) => (
                    <div key={columnId} className="flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {columnId}
                        </h3>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm">
                          {tasks.length}
                        </span>
                      </div>
                      
                      <Droppable droppableId={columnId}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 space-y-3 p-2 rounded-lg min-h-[200px] transition-colors ${
                              snapshot.isDraggingOver 
                                ? 'bg-orange-50 dark:bg-orange-900/20' 
                                : 'bg-gray-50 dark:bg-gray-700/50'
                            }`}
                          >
                            {tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`cursor-grab transition-all dark:bg-gray-800 dark:border-gray-600 ${
                                      snapshot.isDragging 
                                        ? 'shadow-lg rotate-2 scale-105' 
                                        : 'hover:shadow-md'
                                    }`}
                                  >
                                    <CardHeader className="pb-3">
                                      <div className="flex items-start justify-between">
                                        <CardTitle className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                          {task.title}
                                        </CardTitle>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                          <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                        {task.description}
                                      </p>
                                      
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                          <Users className="h-3 w-3" />
                                          <span>{task.assignee}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                          <Calendar className="h-3 w-3" />
                                          <span>{task.dueDate}</span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-1">
                                            {getPriorityIcon(task.priority)}
                                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                              {task.priority}
                                            </span>
                                          </div>
                                          <Clock className="h-3 w-3 text-gray-400" />
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Board;
