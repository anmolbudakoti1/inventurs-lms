import { Button } from "@/components/ui/button";
import { GraduationCap, Home, Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track to continue your learning journey!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="px-8 py-3 rounded-xl border-2 hover:border-indigo-300 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center space-x-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span>Popular Destinations</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Link 
              to="/courses" 
              className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100"
            >
              <Search className="h-5 w-5 text-indigo-500" />
              <span className="font-medium text-gray-700">Browse Courses</span>
            </Link>
            
            <Link 
              to="/student-courses" 
              className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100"
            >
              <GraduationCap className="h-5 w-5 text-indigo-500" />
              <span className="font-medium text-gray-700">My Courses</span>
            </Link>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-12 opacity-60">
          <p className="text-sm text-gray-500">
            "The best time to plant a tree was 20 years ago. The second best time is now." 
            <br />
            <span className="italic">- Let's continue learning!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
