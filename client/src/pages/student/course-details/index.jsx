import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle, Users, Calendar, BookOpen, Clock, Star, Award, Shield } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    // const checkCoursePurchaseInfoResponse =
    //   await checkCoursePurchaseInfoService(
    //     currentCourseDetailsId,
    //     auth?.user._id
    //   );

    // if (
    //   checkCoursePurchaseInfoResponse?.success &&
    //   checkCoursePurchaseInfoResponse?.data
    // ) {
    //   navigate(`/course-progress/${currentCourseDetailsId}`);
    //   return;
    // }

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    console.log(paymentPayload, "paymentPayload");
    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-40 w-28 h-28 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Course Info */}
            <div className="lg:col-span-2 text-white">
              <div className="mb-4">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                  {studentViewCourseDetails?.level?.toUpperCase()} LEVEL
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {studentViewCourseDetails?.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-indigo-100 mb-6 leading-relaxed">
                {studentViewCourseDetails?.subtitle}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-6 text-indigo-200">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">
                    Created by <span className="text-yellow-300 font-bold">{studentViewCourseDetails?.instructorName}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(studentViewCourseDetails?.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>{studentViewCourseDetails?.primaryLanguage}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>
                    {studentViewCourseDetails?.students?.length || 0} {" "}
                    {(studentViewCourseDetails?.students?.length || 0) <= 1 ? "Student" : "Students"}
                  </span>
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-yellow-300 font-bold ml-2">4.8</span>
                  <span className="text-indigo-200">(1,234 reviews)</span>
                </div>
              </div>
            </div>

            {/* Preview Video Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <VideoPlayer
                      url={
                        getIndexOfFreePreviewUrl !== -1
                          ? studentViewCourseDetails?.curriculum[getIndexOfFreePreviewUrl].videoUrl
                          : ""
                      }
                      width="100%"
                      height="250px"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${studentViewCourseDetails?.pricing}
                        </span>
                        <span className="text-lg text-gray-500 line-through">$199</span>
                      </div>
                      <p className="text-green-600 font-semibold">Save 75% today!</p>
                    </div>
                    
                    <Button 
                      onClick={handleCreatePayment} 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Buy Now - Full Lifetime Access
                    </Button>
                    
                    <div className="mt-4 space-y-2 text-center text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                  <CheckCircle className="h-7 w-7" />
                  <span>What You'll Learn</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {studentViewCourseDetails?.objectives?.split(",").map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-green-50 transition-colors duration-300">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{objective.trim()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                  <BookOpen className="h-7 w-7" />
                  <span>Course Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {studentViewCourseDetails?.description}
                </p>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                  <PlayCircle className="h-7 w-7" />
                  <span>Course Curriculum</span>
                </CardTitle>
                <p className="text-purple-100 mt-2">
                  {studentViewCourseDetails?.curriculum?.length || 0} lectures
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-3">
                  {studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
                    <div
                      key={index}
                      className={`${
                        curriculumItem?.freePreview
                          ? "cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                          : "cursor-not-allowed opacity-60"
                      } flex items-center p-4 rounded-2xl border-2 border-gray-100 transition-all duration-300`}
                      onClick={curriculumItem?.freePreview ? () => handleSetFreePreview(curriculumItem) : null}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          curriculumItem?.freePreview 
                            ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" 
                            : "bg-gray-200 text-gray-500"
                        }`}>
                          {curriculumItem?.freePreview ? (
                            <PlayCircle className="h-6 w-6" />
                          ) : (
                            <Lock className="h-6 w-6" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{curriculumItem?.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>15 min</span>
                            </span>
                            {curriculumItem?.freePreview && (
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                                FREE PREVIEW
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Course Features */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                  <CardTitle className="text-xl font-bold">This Course Includes</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-indigo-500" />
                      <span className="text-gray-700">Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-indigo-500" />
                      <span className="text-gray-700">{studentViewCourseDetails?.curriculum?.length || 0} lectures</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-indigo-500" />
                      <span className="text-gray-700">Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <span className="text-gray-700">Access on mobile and desktop</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="max-w-4xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 -m-6 mb-4">
            <DialogTitle className="text-2xl font-bold flex items-center space-x-3">
              <PlayCircle className="h-7 w-7" />
              <span>Course Preview</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-2">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 mb-6">
              <VideoPlayer
                url={displayCurrentVideoFreePreview}
                width="100%"
                height="450px"
              />
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <h4 className="font-bold text-gray-900 mb-3">Available Previews:</h4>
              {studentViewCourseDetails?.curriculum
                ?.filter((item) => item.freePreview)
                .map((filteredItem, index) => (
                  <div
                    key={index}
                    onClick={() => handleSetFreePreview(filteredItem)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border border-gray-100"
                  >
                    <PlayCircle className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium text-gray-700">{filteredItem?.title}</span>
                    <span className="ml-auto bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      FREE
                    </span>
                  </div>
                ))}
            </div>
          </div>
          
          <DialogFooter className="p-6 -m-6 mt-4 bg-gray-50">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="outline" 
                className="px-8 py-2 rounded-xl border-2 hover:bg-gray-100"
              >
                Close Preview
              </Button>
            </DialogClose>
            <Button 
              onClick={handleCreatePayment}
              className="px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold"
            >
              Enroll Now - ${studentViewCourseDetails?.pricing}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
