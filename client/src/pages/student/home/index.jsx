import { courseCategories } from "@/config";
import banner from "../../../../public/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Star,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Play,
  ArrowRight,
} from "lucide-react";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-32 w-24 h-24 bg-white rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-40 left-40 w-40 h-40 bg-white rounded-full animate-pulse delay-150"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-pulse delay-300"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-yellow-300 to-orange-300 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                  🎓 #1 Learning Platform
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Future with
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                  Expert Learning
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-indigo-100 mb-8 leading-relaxed">
                Master new skills, advance your career, and unlock your
                potential with our world-class courses taught by industry
                experts.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/courses")}
                  className="border-2 border-white/30 text-black hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg"
                >
                  Browse Courses
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">
                    {studentViewCoursesList?.length || 0}+
                  </div>
                  <div className="text-sm text-indigo-200">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">
                    50K+
                  </div>
                  <div className="text-sm text-indigo-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">
                    98%
                  </div>
                  <div className="text-sm text-indigo-200">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-3xl blur-2xl"></div>
              <img
                src={banner}
                width={600}
                height={400}
                className="relative w-full h-auto rounded-3xl shadow-2xl"
                alt="Learning platform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Inventurs
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience world-class learning with cutting-edge features
              designed to accelerate your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world
                experience
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Comprehensive Content
              </h3>
              <p className="text-gray-600">
                In-depth courses covering everything from basics to advanced
                concepts
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-violet-200 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Certificates
              </h3>
              <p className="text-gray-600">
                Earn recognized certificates to showcase your new skills
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-200 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Career Growth
              </h3>
              <p className="text-gray-600">
                Advance your career with skills that employers value most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600">
              Discover courses tailored to your interests and career goals
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {courseCategories.map((categoryItem, index) => (
              <Button
                className="h-24 p-6 justify-center flex-col bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200/50 hover:border-indigo-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:text-indigo-600 group"
                variant="outline"
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-center leading-tight">
                  {categoryItem.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Featured{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Start your learning journey with our most popular and highly-rated
              courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.slice(0, 8).map((courseItem, index) => (
                <div
                  key={courseItem?._id}
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 border border-gray-100 hover:border-indigo-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={courseItem?.image}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={courseItem?.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Course Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        POPULAR
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-900">
                        4.8
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {courseItem?.title}
                    </h3>

                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {courseItem?.instructorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expert Instructor
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${courseItem?.pricing}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          $99
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <BookOpen className="h-3 w-3" />
                        <span>
                          {Math.floor(Math.random() * 20) + 10} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    No Courses Available Yet
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Check back soon for amazing new courses!
                  </p>
                </div>
              </div>
            )}
          </div>

          {studentViewCoursesList && studentViewCoursesList.length > 8 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate("/courses")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Courses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
