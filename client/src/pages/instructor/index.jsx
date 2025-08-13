import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut, Menu, X, GraduationCap } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  function handleMenuItemClick(value) {
    if (value === "logout") {
      handleLogout();
    } else {
      setActiveTab(value);
    }
    setIsMobileMenuOpen(false);
  }

  console.log(instructorCoursesList, "instructorCoursesList");

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 lg:px-8 border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center group transition-all duration-300">
            <GraduationCap className="h-8 w-8 mr-3 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
            <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Inventurs
            </span>
          </Link>
          <div className="hidden md:block">
            <span className="text-sm text-gray-600">Instructor Portal</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow border border-gray-200">
              <div className="text-xs text-gray-600">Total Courses</div>
              <div className="text-lg font-bold text-blue-600">{instructorCoursesList?.length || 0}</div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-72 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1 text-gray-900">Navigation</h2>
              <p className="text-sm text-gray-600">Manage your courses and content</p>
            </div>
            <nav className="space-y-2">
              {menuItems.map((menuItem, index) => (
                <Button
                  className={`w-full justify-start py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === menuItem.value 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 text-gray-700"
                  }`}
                  key={menuItem.value}
                  variant="ghost"
                  onClick={() => handleMenuItemClick(menuItem.value)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <menuItem.icon className={`mr-3 h-5 w-5 ${
                    activeTab === menuItem.value ? "text-white" : "text-gray-500"
                  }`} />
                  {menuItem.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <aside className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200">
              <div className="p-6 pt-20">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1 text-gray-900">Navigation</h2>
                  <p className="text-sm text-gray-600">Manage your courses and content</p>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((menuItem, index) => (
                    <Button
                      className={`w-full justify-start py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === menuItem.value 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 text-gray-700"
                      }`}
                      key={menuItem.value}
                      variant="ghost"
                      onClick={() => handleMenuItemClick(menuItem.value)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <menuItem.icon className={`mr-3 h-5 w-5 ${
                        activeTab === menuItem.value ? "text-white" : "text-gray-500"
                      }`} />
                      {menuItem.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {activeTab === "dashboard" ? "Dashboard Overview" : "Course Management"}
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600">
                      {activeTab === "dashboard" 
                        ? "Track your teaching performance and student engagement" 
                        : "Create, edit, and manage your course content"
                      }
                    </p>
                  </div>
                  
                  {/* Mobile stats card */}
                  <div className="md:hidden mt-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 w-fit">
                      <div className="text-sm text-gray-600">Total Courses</div>
                      <div className="text-2xl font-bold text-blue-600">{instructorCoursesList?.length || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {menuItems.map((menuItem) => (
                    <TabsContent key={menuItem.value} value={menuItem.value} className="p-4 md:p-6">
                      {menuItem.component !== null ? menuItem.component : null}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboardpage;
