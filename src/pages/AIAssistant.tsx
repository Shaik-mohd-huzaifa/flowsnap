
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AIChatbot } from "@/components/AIChatbot";

export default function AIAssistant() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-screen">
          <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="hover:bg-orange-100 dark:hover:bg-orange-900/20" />
            <div>
              <h1 className="font-instrument text-2xl font-semibold text-gray-900 dark:text-white">
                AI Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Chat with AI to manage your notes and board tiles
              </p>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-6">
            <AIChatbot />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
