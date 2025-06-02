
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "FlowSnap Inc."
  });

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle dark mode toggle
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked.toString());
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSave = () => {
    console.log("Settings saved:", { notifications, darkMode, emailUpdates, profile });
  };

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
                    Settings
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
              
              <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </header>

            {/* Settings Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile Settings */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company" className="dark:text-gray-300">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications" className="dark:text-gray-300">Push Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about task updates</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-updates" className="dark:text-gray-300">Email Updates</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly summary emails</p>
                      </div>
                      <Switch
                        id="email-updates"
                        checked={emailUpdates}
                        onCheckedChange={setEmailUpdates}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode" className="dark:text-gray-300">Dark Mode</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={handleDarkModeChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Shield className="h-5 w-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full md:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                      Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Settings;
