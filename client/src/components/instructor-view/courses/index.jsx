import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit, BookOpen, Users, DollarSign, Plus, Award } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-20 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <span>My Courses</span>
            </h1>
            <p className="text-indigo-100 text-lg">
              Manage and track your course performance
            </p>
          </div>
          
          <Button
            onClick={() => {
              setCurrentEditedCourseId(null);
              setCourseLandingFormData(courseLandingInitialFormData);
              setCourseCurriculumFormData(courseCurriculumInitialFormData);
              navigate("/instructor/create-new-course");
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Courses Grid/List */}
      {listOfCourses && listOfCourses.length > 0 ? (
        <div className="grid gap-6">
          {listOfCourses.map((course, index) => (
            <Card key={course?._id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Course Image */}
                  <div className="lg:w-80 h-48 lg:h-auto relative overflow-hidden">
                    <img
                      src={course?.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={course?.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Course Level Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course?.level?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                          {course?.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {course?.subtitle || course?.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-4 text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{course?.students?.length || 0}</div>
                          <div className="text-sm text-gray-600">Students</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-4 text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${((course?.students?.length || 0) * course?.pricing).toFixed(0)}
                          </div>
                          <div className="text-sm text-gray-600">Revenue</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl p-4 text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">4.8</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ${course?.pricing}
                          </span>
                          <span className="text-sm text-gray-500">per student</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => {
                              navigate(`/instructor/edit-course/${course?._id}`);
                            }}
                            variant="outline"
                            size="sm"
                            className="px-4 py-2 rounded-xl border-2 hover:border-indigo-300 transition-all duration-300 hover:bg-indigo-50"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="px-4 py-2 rounded-xl border-2 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-300"
                          >
                            <Delete className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No Courses Created Yet
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              Start your teaching journey by creating your first course!
            </p>
            <Button
              onClick={() => {
                setCurrentEditedCourseId(null);
                setCourseLandingFormData(courseLandingInitialFormData);
                setCourseCurriculumFormData(courseCurriculumInitialFormData);
                navigate("/instructor/create-new-course");
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Course
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default InstructorCourses;
