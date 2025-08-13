import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, BookOpen, TrendingUp, Award, Star, Calendar, Clock } from "lucide-react";

function InstructorDashboard({ listOfCourses }) {
  function calculateTotalStudentsAndProfit() {
    // Debug: Log the courses data to see what we're working with
    console.log("DEBUG: listOfCourses =", listOfCourses);
    console.log("DEBUG: Total courses =", listOfCourses?.length);
    
    if (!listOfCourses || listOfCourses.length === 0) {
      console.log("DEBUG: No courses available");
      return {
        totalProfit: 0,
        totalStudents: 0,
        studentList: [],
      };
    }

    const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students?.length || 0;
        console.log(`DEBUG: Course "${course.title}" has ${studentCount} students:`, course.students);
        
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        if (course.students && course.students.length > 0) {
          course.students.forEach((student) => {
            acc.studentList.push({
              courseTitle: course.title,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });
        }

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );

    console.log("DEBUG: Final calculation result =", {
      totalStudents,
      totalProfit,
      studentList
    });

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  const calculationResult = calculateTotalStudentsAndProfit();

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: calculationResult.totalStudents,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-100 to-indigo-200",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `$${calculationResult.totalProfit.toFixed(2)}`,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-100 to-emerald-200",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: listOfCourses?.length || 0,
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-100 to-violet-200",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "98%",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-100 to-red-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {config.map((item, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${item.bgColor} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/20 -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">4.9</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Students List */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                    <Users className="h-7 w-7" />
                    <span>Recent Enrollments</span>
                  </CardTitle>
                  <p className="text-indigo-100 mt-2">Latest students who joined your courses</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {calculationResult.studentList.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-100">
                        <TableHead className="text-gray-700 font-semibold py-4">Course</TableHead>
                        <TableHead className="text-gray-700 font-semibold py-4">Student</TableHead>
                        <TableHead className="text-gray-700 font-semibold py-4">Email</TableHead>
                        <TableHead className="text-gray-700 font-semibold py-4">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculationResult.studentList.slice(0, 5).map((studentItem, index) => (
                        <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-200">
                          <TableCell className="font-medium py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-gray-900">{studentItem.courseTitle}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{studentItem.studentName.charAt(0)}</span>
                              </div>
                              <span className="font-medium text-gray-900">{studentItem.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 py-4">{studentItem.studentEmail}</TableCell>
                          <TableCell className="py-4">
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No Students Yet</h3>
                  <p className="text-gray-500">Students will appear here once they enroll in your courses.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Performance */}
        <div className="space-y-6">
          {/* Performance Overview */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Course Rating</span>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-bold text-gray-900">4.9</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-bold text-gray-900">92%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Student Satisfaction</span>
                <span className="font-bold text-gray-900">98%</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <span>This Month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">New Enrollments</span>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.floor(calculationResult.totalStudents * 0.3)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Revenue Growth</span>
                </div>
                <span className="font-bold text-green-600">+12%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Course Views</span>
                </div>
                <span className="font-bold text-blue-600">{Math.floor(calculationResult.totalStudents * 2.5)}K</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
