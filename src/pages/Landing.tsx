import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Zap, Shield, Star, Check, Edit3, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center opacity-60">
            <Edit3 className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-500">
          <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center opacity-50">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-700">
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center opacity-70">
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="absolute top-1/3 right-10 animate-pulse delay-1000">
          <div className="w-14 h-14 bg-purple-200 rounded-lg flex items-center justify-center opacity-40">
            <Users className="h-7 w-7 text-purple-600" />
          </div>
        </div>
        <div className="absolute bottom-20 right-1/4 animate-bounce delay-200">
          <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center opacity-60">
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse delay-800">
          <div className="w-6 h-6 bg-red-200 rounded-lg flex items-center justify-center opacity-50">
            <Star className="h-3 w-3 text-red-600" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <h1 className="font-instrument font-semibold text-2xl text-gray-900">
                FlowSnap
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/app">
                <Button variant="ghost" className="text-gray-600 hover:text-orange-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/app">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-instrument text-5xl md:text-7xl font-semibold text-gray-900 mb-6">
              Your Ideas,
              <span className="text-orange-500"> Organized</span>
            </h1>
            <p className="font-inter text-xl text-gray-600 mb-8 leading-relaxed">
              FlowSnap brings together notes, documents, and collaboration in one beautiful, 
              intuitive platform. Capture thoughts, organize projects, and work seamlessly with your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4">
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-instrument text-4xl font-semibold text-gray-900 mb-4">
              Everything you need to stay productive
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              From quick notes to complex projects, FlowSnap adapts to your workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-instrument text-xl">Smart Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-inter text-center">
                  Rich text editing with markdown support, templates, and smart organization.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-instrument text-xl">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-inter text-center">
                  Real-time editing, comments, and sharing with granular permissions.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-instrument text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-inter text-center">
                  Instant search, quick capture, and seamless sync across all devices.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="font-instrument text-xl">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-inter text-center">
                  End-to-end encryption and enterprise-grade security for your data.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-instrument font-semibold text-xl">FlowSnap</span>
            </div>
            <p className="font-inter text-gray-400">
              © 2024 FlowSnap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
