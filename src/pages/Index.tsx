
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainContent } from "@/components/MainContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-instrument">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
