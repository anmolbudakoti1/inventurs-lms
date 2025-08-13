import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap, BookOpen, Users, Trophy, ArrowRight } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  console.log(signInFormData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-6 py-4">
        <Link to={"/"} className="flex items-center group transition-all duration-300 w-fit">
          <GraduationCap className="h-8 w-8 mr-3 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
          <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Inventurs
          </span>
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-60 right-32 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute bottom-40 left-40 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Transform Your
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Join thousands of learners who are mastering new skills and advancing their careers with Inventurs.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert-Led Courses</h3>
                  <p className="text-indigo-200">Learn from industry professionals</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Active Community</h3>
                  <p className="text-indigo-200">Connect with fellow learners</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Certified Learning</h3>
                  <p className="text-indigo-200">Earn recognized certificates</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">10K+</div>
                  <div className="text-sm text-indigo-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">500+</div>
                  <div className="text-sm text-indigo-200">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">98%</div>
                  <div className="text-sm text-indigo-200">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6 pt-16 sm:pt-12">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {activeTab === "signin" ? "Welcome Back!" : "Join Inventurs"}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                {activeTab === "signin" 
                  ? "Sign in to continue your learning journey" 
                  : "Create your account to start learning"
                }
              </p>
            </div>

            <Tabs
              value={activeTab}
              defaultValue="signin"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 mb-6 sm:mb-8">
                <TabsTrigger 
                  value="signin" 
                  className="rounded-xl font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-xl font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-0">
                <Card className="border-0 shadow-lg sm:shadow-2xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:block">
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</CardTitle>
                      <CardDescription className="text-gray-600 text-base sm:text-lg">
                        Sign in to continue your learning journey
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-4">
                    <CommonForm
                      formControls={signInFormControls}
                      buttonText={"Sign In"}
                      formData={signInFormData}
                      setFormData={setSignInFormData}
                      isButtonDisabled={!checkIfSignInFormIsValid()}
                      handleSubmit={handleLoginUser}
                    />
                    
                    {/* Additional Sign In Options */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-center text-sm text-gray-600">
                        New to Inventurs?{" "}
                        <button
                          onClick={() => setActiveTab("signup")}
                          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center"
                        >
                          Create an account <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="space-y-0">
                <Card className="border-0 shadow-lg sm:shadow-2xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:block">
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join Inventurs</CardTitle>
                      <CardDescription className="text-gray-600 text-base sm:text-lg">
                        Create your account to start learning
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-4">
                    <CommonForm
                      formControls={signUpFormControls}
                      buttonText={"Create Account"}
                      formData={signUpFormData}
                      setFormData={setSignUpFormData}
                      isButtonDisabled={!checkIfSignUpFormIsValid()}
                      handleSubmit={handleRegisterUser}
                    />
                    
                    {/* Additional Sign Up Options */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                          onClick={() => setActiveTab("signin")}
                          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center"
                        >
                          Sign in <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Trust Indicators - Mobile Only */}
            <div className="lg:hidden mt-6 sm:mt-8 text-center px-4">
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Trusted by 10,000+ students worldwide</p>
              <div className="flex justify-center space-x-4 sm:space-x-8 text-xs text-gray-400">
                <span>🔒 Secure</span>
                <span>🎓 Certified</span>
                <span>🌟 Rated 4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
