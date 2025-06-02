
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Zap, Shield, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
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
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 font-inter">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600 font-inter">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-orange-600 font-inter">About</a>
            </nav>
            
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-instrument text-4xl font-semibold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="font-inter text-xl text-gray-600">
              Choose the plan that works best for you and your team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-instrument text-2xl">Personal</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Up to 1,000 notes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Basic collaboration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Mobile & web access</span>
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-instrument text-2xl">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$8</span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Unlimited notes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Advanced collaboration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Advanced integrations</span>
                </div>
                <Button className="w-full mt-8 bg-orange-500 hover:bg-orange-600">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-instrument text-2xl">Team</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-gray-600 ml-2">per user/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Everything in Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Team management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Advanced permissions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-inter">Analytics & insights</span>
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
