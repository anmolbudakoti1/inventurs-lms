import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon, Search, Filter, BookOpen, Clock, User, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
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
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-32 right-32 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-40 w-32 h-32 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Amazing
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive collection of courses designed to accelerate your learning journey
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">{studentViewCoursesList.length}+</div>
              <div className="text-sm text-indigo-200">Available Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">Expert</div>
              <div className="text-sm text-indigo-200">Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">24/7</div>
              <div className="text-sm text-indigo-200">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <Filter className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Filter Courses</h3>
                </div>
                <p className="text-indigo-100 text-sm mt-1">Find your perfect course</p>
              </div>
              
              <div className="p-6 space-y-6">
                {Object.keys(filterOptions).map((ketItem, index) => (
                  <div key={ketItem} className="space-y-3" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                      <span>{ketItem.toUpperCase()}</span>
                    </h4>
                    <div className="space-y-2 pl-4">
                      {filterOptions[ketItem].map((option) => (
                        <Label 
                          key={option.id}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer"
                        >
                          <Checkbox
                            checked={
                              filters &&
                              Object.keys(filters).length > 0 &&
                              filters[ketItem] &&
                              filters[ketItem].indexOf(option.id) > -1
                            }
                            onCheckedChange={() =>
                              handleFilterOnChange(ketItem, option)
                            }
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-600"
                          />
                          <span className="font-medium text-gray-700">{option.label}</span>
                        </Label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold text-gray-700">
                    {studentViewCoursesList.length} Courses Found
                  </span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 hover:border-indigo-300 transition-all duration-300"
                    >
                      <ArrowUpDownIcon className="h-4 w-4" />
                      <span className="font-medium">Sort By</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={(value) => setSort(value)}
                    >
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}
                          className="rounded-xl m-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="space-y-6">
              {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                studentViewCoursesList.map((courseItem, index) => (
                  <Card
                    key={courseItem?._id}
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Course Image */}
                        <div className="md:w-80 h-48 md:h-auto relative overflow-hidden">
                          <img
                            src={courseItem?.image}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={courseItem?.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Course Level Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {courseItem?.level.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="flex-1 p-6 md:p-8">
                          <div className="flex flex-col h-full">
                            <div className="mb-4">
                              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                                {courseItem?.title}
                              </CardTitle>
                              
                              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                                <User className="h-4 w-4" />
                                <span className="text-sm">
                                  Created by{" "}
                                  <span className="font-semibold text-indigo-600">
                                    {courseItem?.instructorName}
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex-1 mb-4">
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <BookOpen className="h-4 w-4 text-indigo-500" />
                                  <span>
                                    {courseItem?.curriculum?.length}{" "}
                                    {courseItem?.curriculum?.length <= 1 ? "Lecture" : "Lectures"}
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4 text-indigo-500" />
                                  <span>Self-paced</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>4.8 (120 reviews)</span>
                                </div>
                              </div>
                            </div>

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                  ${courseItem?.pricing}
                                </span>
                                <span className="text-sm text-gray-500 line-through">$99</span>
                              </div>
                              
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : loadingState ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/90 rounded-3xl p-8 animate-pulse">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-80 h-48 bg-gray-200 rounded-2xl mb-4 md:mb-0 md:mr-8"></div>
                        <div className="flex-1 space-y-4">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-8">
                    <Search className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No Courses Found</h3>
                    <p className="text-gray-500">Try adjusting your filters to find more courses.</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
