require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Course = require("./models/Course");
const Order = require("./models/Order");
const Progress = require("./models/CourseProgress");
const StudentCourses = require("./models/StudentCourses");

const MONGO_URI = process.env.MONGO_URI;

const users = [
  // Instructors
  {
    userName: "John Smith",
    userEmail: "john.smith@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Michael Chen",
    userEmail: "michael.chen@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Emily Rodriguez",
    userEmail: "emily.rodriguez@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "David Wilson",
    userEmail: "david.wilson@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Jessica Brown",
    userEmail: "jessica.brown@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Robert Taylor",
    userEmail: "robert.taylor@instructor.com",
    password: "password123",
    role: "instructor"
  },
  {
    userName: "Lisa Anderson",
    userEmail: "lisa.anderson@instructor.com",
    password: "password123",
    role: "instructor"
  },
  // Students
  {
    userName: "Alex Thompson",
    userEmail: "alex.thompson@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Maria Garcia",
    userEmail: "maria.garcia@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "James Miller",
    userEmail: "james.miller@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Emma Davis",
    userEmail: "emma.davis@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Daniel Lee",
    userEmail: "daniel.lee@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Sofia Martinez",
    userEmail: "sofia.martinez@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Ryan Clark",
    userEmail: "ryan.clark@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Olivia White",
    userEmail: "olivia.white@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Kevin Turner",
    userEmail: "kevin.turner@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Ava Lewis",
    userEmail: "ava.lewis@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Nathan Hall",
    userEmail: "nathan.hall@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Isabella Young",
    userEmail: "isabella.young@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Tyler King",
    userEmail: "tyler.king@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Chloe Green",
    userEmail: "chloe.green@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Brandon Adams",
    userEmail: "brandon.adams@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Grace Baker",
    userEmail: "grace.baker@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Austin Carter",
    userEmail: "austin.carter@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Zoe Mitchell",
    userEmail: "zoe.mitchell@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Luke Nelson",
    userEmail: "luke.nelson@student.com",
    password: "password123",
    role: "student"
  },
  {
    userName: "Maya Parker",
    userEmail: "maya.parker@student.com",
    password: "password123",
    role: "student"
  }
];

const courses = [
  // Web Development Courses
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-01-15"),
    title: "Complete React.js Masterclass 2024",
    category: "web development",
    level: "intermediate",
    primaryLanguage: "english",
    subtitle: "Master React.js from basics to advanced concepts with real projects",
    description: "A comprehensive course covering React.js fundamentals, hooks, state management, routing, and modern development practices. Build 5+ real-world projects including e-commerce, social media app, and portfolio sites.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to the Complete React.js Masterclass! Get ready to become a React expert and build amazing web applications.",
    pricing: 99.99,
    objectives: "Learn React fundamentals and advanced concepts, Master hooks and state management, Build 5+ real-world projects, Understand modern React patterns and best practices, Deploy applications to production",
    students: [],
    curriculum: [
      {
        title: "Introduction to React and Modern JavaScript",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        public_id: "react_intro_001",
        freePreview: true
      },
      {
        title: "Components, JSX, and Props",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        public_id: "react_components_002",
        freePreview: false
      },
      {
        title: "State Management and Event Handling",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        public_id: "react_state_003",
        freePreview: false
      },
      {
        title: "React Hooks - useState and useEffect",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        public_id: "react_hooks_004",
        freePreview: false
      },
      {
        title: "Advanced Hooks and Custom Hooks",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        public_id: "react_advanced_hooks_005",
        freePreview: false
      },
      {
        title: "React Router and Navigation",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        public_id: "react_router_006",
        freePreview: false
      },
      {
        title: "Context API and Global State",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        public_id: "react_context_007",
        freePreview: false
      }
    ],
    isPublised: true
  },
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-02-01"),
    title: "Node.js Backend Development Bootcamp",
    category: "backend development",
    level: "beginner",
    primaryLanguage: "english",
    subtitle: "Build scalable backend applications with Node.js, Express, and MongoDB",
    description: "Learn to build robust backend applications using Node.js, Express, MongoDB, and modern development practices. Includes authentication, APIs, testing, and deployment to cloud platforms.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Node.js Backend Development! Let's build amazing backend applications that scale.",
    pricing: 79.99,
    objectives: "Master Node.js fundamentals, Build REST APIs and GraphQL endpoints, Implement authentication and authorization, Work with databases (MongoDB, PostgreSQL), Test and deploy applications",
    students: [],
    curriculum: [
      {
        title: "Node.js Fundamentals and NPM",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        public_id: "nodejs_intro_001",
        freePreview: true
      },
      {
        title: "Express.js Framework and Middleware",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        public_id: "express_basics_002",
        freePreview: false
      },
      {
        title: "MongoDB and Mongoose ODM",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        public_id: "mongodb_integration_003",
        freePreview: false
      },
      {
        title: "Authentication with JWT",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        public_id: "jwt_auth_004",
        freePreview: false
      },
      {
        title: "File Upload and Image Processing",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        public_id: "file_upload_005",
        freePreview: false
      }
    ],
    isPublised: true
  },
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-03-10"),
    title: "Modern JavaScript ES6+ Complete Guide",
    category: "programming",
    level: "intermediate",
    primaryLanguage: "english",
    subtitle: "Master modern JavaScript features and advanced programming concepts",
    description: "Dive deep into ES6+ features including arrow functions, destructuring, async/await, modules, classes, and more. Learn functional programming, design patterns, and best practices.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Modern JavaScript! Let's explore the power of ES6+ and become JavaScript experts.",
    pricing: 59.99,
    objectives: "Master ES6+ syntax and features, Understand async programming and promises, Learn functional programming concepts, Apply modern JavaScript patterns, Write clean and maintainable code",
    students: [],
    curriculum: [
      {
        title: "ES6 Fundamentals: Let, Const, and Arrow Functions",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        public_id: "js_es6_001",
        freePreview: true
      },
      {
        title: "Destructuring and Spread/Rest Operators",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        public_id: "js_destructuring_002",
        freePreview: false
      },
      {
        title: "Template Literals and String Methods",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        public_id: "js_templates_003",
        freePreview: false
      },
      {
        title: "Promises and Async/Await",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        public_id: "js_async_004",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Data Science & AI Courses
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-04-05"),
    title: "Python for Data Science and Machine Learning",
    category: "data science",
    level: "beginner",
    primaryLanguage: "english",
    subtitle: "Complete data science bootcamp with Python, pandas, and scikit-learn",
    description: "Learn data science from scratch using Python. Cover data analysis, visualization, machine learning, and deep learning. Work with real datasets and build predictive models.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Data Science with Python! Let's unlock the power of data and machine learning.",
    pricing: 129.99,
    objectives: "Master Python for data analysis, Learn pandas and NumPy libraries, Create stunning visualizations, Build machine learning models, Work with real-world datasets",
    students: [],
    curriculum: [
      {
        title: "Python Fundamentals for Data Science",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        public_id: "python_ds_001",
        freePreview: true
      },
      {
        title: "NumPy and Pandas Essentials",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        public_id: "numpy_pandas_002",
        freePreview: false
      },
      {
        title: "Data Visualization with Matplotlib and Seaborn",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        public_id: "data_viz_003",
        freePreview: false
      },
      {
        title: "Machine Learning with Scikit-Learn",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        public_id: "ml_sklearn_004",
        freePreview: false
      },
      {
        title: "Deep Learning Introduction with TensorFlow",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        public_id: "deep_learning_005",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Mobile Development
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-05-15"),
    title: "React Native Mobile App Development",
    category: "mobile development",
    level: "intermediate",
    primaryLanguage: "english",
    subtitle: "Build cross-platform mobile apps with React Native",
    description: "Create native mobile applications for iOS and Android using React Native. Learn navigation, state management, native modules, and app store deployment.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to React Native Development! Let's build amazing mobile apps together.",
    pricing: 109.99,
    objectives: "Master React Native fundamentals, Build native mobile interfaces, Implement navigation and routing, Handle device features and APIs, Deploy to app stores",
    students: [],
    curriculum: [
      {
        title: "React Native Setup and Architecture",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        public_id: "rn_setup_001",
        freePreview: true
      },
      {
        title: "Core Components and Styling",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        public_id: "rn_components_002",
        freePreview: false
      },
      {
        title: "Navigation with React Navigation",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        public_id: "rn_navigation_003",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // UI/UX Design
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-06-01"),
    title: "Complete UI/UX Design Masterclass",
    category: "design",
    level: "beginner",
    primaryLanguage: "english",
    subtitle: "Design beautiful and user-friendly interfaces",
    description: "Learn the complete UI/UX design process from research to prototyping. Master Figma, design systems, user psychology, and create portfolio-worthy projects.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to UI/UX Design! Let's create beautiful and functional user experiences.",
    pricing: 89.99,
    objectives: "Understand UX research methods, Master Figma and design tools, Create design systems, Build interactive prototypes, Develop a professional portfolio",
    students: [],
    curriculum: [
      {
        title: "Introduction to UI/UX Design Principles",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        public_id: "ux_intro_001",
        freePreview: true
      },
      {
        title: "User Research and Personas",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        public_id: "ux_research_002",
        freePreview: false
      },
      {
        title: "Wireframing and Information Architecture",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        public_id: "wireframing_003",
        freePreview: false
      },
      {
        title: "Figma Mastery and Design Systems",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        public_id: "figma_design_004",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // DevOps
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-07-10"),
    title: "DevOps with Docker and Kubernetes",
    category: "devops",
    level: "advanced",
    primaryLanguage: "english",
    subtitle: "Master containerization and orchestration",
    description: "Learn modern DevOps practices with Docker, Kubernetes, CI/CD pipelines, and cloud deployment. Build scalable and reliable applications.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to DevOps! Let's master the art of building and deploying scalable applications.",
    pricing: 139.99,
    objectives: "Master Docker containerization, Learn Kubernetes orchestration, Build CI/CD pipelines, Deploy to cloud platforms, Monitor and scale applications",
    students: [],
    curriculum: [
      {
        title: "Docker Fundamentals and Containerization",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        public_id: "docker_basics_001",
        freePreview: true
      },
      {
        title: "Docker Compose and Multi-Container Apps",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        public_id: "docker_compose_002",
        freePreview: false
      },
      {
        title: "Kubernetes Architecture and Pods",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        public_id: "k8s_basics_003",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Cybersecurity
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-08-05"),
    title: "Ethical Hacking and Cybersecurity",
    category: "cybersecurity",
    level: "intermediate",
    primaryLanguage: "english",
    subtitle: "Learn ethical hacking and security fundamentals",
    description: "Comprehensive cybersecurity course covering penetration testing, network security, web application security, and defensive strategies.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Ethical Hacking! Let's learn to protect systems by understanding how they can be compromised.",
    pricing: 119.99,
    objectives: "Understand security fundamentals, Learn penetration testing, Master security tools, Identify vulnerabilities, Implement security measures",
    students: [],
    curriculum: [
      {
        title: "Introduction to Cybersecurity",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        public_id: "security_intro_001",
        freePreview: true
      },
      {
        title: "Network Security Fundamentals",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        public_id: "network_security_002",
        freePreview: false
      },
      {
        title: "Web Application Security Testing",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        public_id: "web_security_003",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Business & Marketing
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-09-15"),
    title: "Digital Marketing and SEO Mastery",
    category: "marketing",
    level: "beginner",
    primaryLanguage: "english",
    subtitle: "Complete digital marketing strategy and execution",
    description: "Learn digital marketing from basics to advanced strategies. Cover SEO, social media marketing, Google Ads, content marketing, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Digital Marketing! Let's build powerful marketing strategies that drive results.",
    pricing: 69.99,
    objectives: "Master SEO and content marketing, Learn social media strategies, Understand paid advertising, Use analytics tools, Build marketing funnels",
    students: [],
    curriculum: [
      {
        title: "Digital Marketing Fundamentals",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        public_id: "marketing_basics_001",
        freePreview: true
      },
      {
        title: "SEO and Content Strategy",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        public_id: "seo_content_002",
        freePreview: false
      },
      {
        title: "Social Media Marketing",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        public_id: "social_media_003",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Full Stack Development
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-10-01"),
    title: "Full Stack Web Development with MERN",
    category: "full stack",
    level: "advanced",
    primaryLanguage: "english",
    subtitle: "Complete full stack development with MongoDB, Express, React, Node.js",
    description: "Comprehensive bootcamp covering the entire MERN stack. Build and deploy multiple full-stack applications including e-commerce, social media, and portfolio sites.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Full Stack Development! Ready to become a complete web developer with the MERN stack?",
    pricing: 199.99,
    objectives: "Master the complete MERN stack, Build 3+ full-stack applications, Implement authentication and authorization, Deploy to cloud platforms, Work with payments and APIs",
    students: [],
    curriculum: [
      {
        title: "MERN Stack Overview and Setup",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        public_id: "mern_overview_001",
        freePreview: true
      },
      {
        title: "MongoDB and Database Design",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        public_id: "mongodb_design_002",
        freePreview: false
      },
      {
        title: "Express.js API Development",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        public_id: "express_api_003",
        freePreview: false
      },
      {
        title: "React Frontend Development",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        public_id: "react_frontend_004",
        freePreview: false
      },
      {
        title: "Authentication and Security",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        public_id: "auth_security_005",
        freePreview: false
      },
      {
        title: "Payment Integration and E-commerce",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        public_id: "payment_ecommerce_006",
        freePreview: false
      },
      {
        title: "Deployment and Production",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        public_id: "deployment_prod_007",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Game Development
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-11-10"),
    title: "Unity 3D Game Development Complete Course",
    category: "game development",
    level: "intermediate",
    primaryLanguage: "english",
    subtitle: "Create 2D and 3D games with Unity and C#",
    description: "Learn game development with Unity 3D engine. Create multiple games including platformers, RPGs, and VR experiences. Master C# programming for games.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to Unity Game Development! Let's create amazing games together.",
    pricing: 149.99,
    objectives: "Master Unity 3D engine, Learn C# programming for games, Create 2D and 3D games, Implement game physics and AI, Publish games to stores",
    students: [],
    curriculum: [
      {
        title: "Unity Interface and Basic Concepts",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        public_id: "unity_basics_001",
        freePreview: true
      },
      {
        title: "C# Programming for Unity",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        public_id: "unity_csharp_002",
        freePreview: false
      },
      {
        title: "2D Game Development",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        public_id: "unity_2d_003",
        freePreview: false
      },
      {
        title: "3D Game Development and Physics",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        public_id: "unity_3d_004",
        freePreview: false
      }
    ],
    isPublised: true
  },
  // Cloud Computing
  {
    instructorId: "",
    instructorName: "",
    date: new Date("2024-12-01"),
    title: "AWS Cloud Practitioner Complete Guide",
    category: "cloud computing",
    level: "beginner",
    primaryLanguage: "english",
    subtitle: "Master Amazon Web Services fundamentals",
    description: "Complete AWS cloud computing course covering core services, architecture, security, and cost optimization. Prepare for AWS Cloud Practitioner certification.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=entropy&cs=tinysrgb",
    welcomeMessage: "Welcome to AWS Cloud Computing! Let's master the cloud and transform your career.",
    pricing: 99.99,
    objectives: "Understand AWS core services, Learn cloud architecture patterns, Master security and compliance, Optimize costs and performance, Prepare for certification",
    students: [],
    curriculum: [
      {
        title: "Introduction to Cloud Computing and AWS",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        public_id: "aws_intro_001",
        freePreview: true
      },
      {
        title: "EC2 and Compute Services",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        public_id: "aws_ec2_002",
        freePreview: false
      },
      {
        title: "Storage Services (S3, EBS, EFS)",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        public_id: "aws_storage_003",
        freePreview: false
      },
      {
        title: "Database Services (RDS, DynamoDB)",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        public_id: "aws_database_004",
        freePreview: false
      }
    ],
    isPublised: true
  }
];

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

async function clearDatabase() {
  try {
    await User.deleteMany({});
    await Course.deleteMany({});
    await Order.deleteMany({});
    await Progress.deleteMany({});
    await StudentCourses.deleteMany({});
    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
}

async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );
    
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`${createdUsers.length} users created successfully`);
    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    return [];
  }
}

async function seedCourses(createdUsers) {
  try {
    const instructors = createdUsers.filter(user => user.role === "instructor");
    const students = createdUsers.filter(user => user.role === "student");
    
    const coursesWithInstructorIds = courses.map((course, index) => {
      const instructor = instructors[index % instructors.length];
      return {
        ...course,
        instructorId: instructor._id.toString(),
        instructorName: instructor.userName,
        students: index < 2 ? students.slice(0, 2).map(student => ({
          studentId: student._id.toString(),
          studentName: student.userName,
          studentEmail: student.userEmail,
          paidAmount: course.pricing.toString()
        })) : []
      };
    });
    
    const createdCourses = await Course.insertMany(coursesWithInstructorIds);
    console.log(`${createdCourses.length} courses created successfully`);
    return createdCourses;
  } catch (error) {
    console.error("Error seeding courses:", error);
    return [];
  }
}

async function seedOrders(createdUsers, createdCourses) {
  try {
    const students = createdUsers.filter(user => user.role === "student");
    const orders = [];
    
    // Generate multiple orders per student with random enrollment patterns
    for (const student of students) {
      const numCoursesToBuy = Math.floor(Math.random() * 4) + 1; // 1-4 courses per student
      const shuffledCourses = [...createdCourses].sort(() => 0.5 - Math.random());
      const coursesToBuy = shuffledCourses.slice(0, numCoursesToBuy);
      
      for (const course of coursesToBuy) {
        // Random order date within the last 6 months
        const randomDate = new Date();
        randomDate.setMonth(randomDate.getMonth() - Math.floor(Math.random() * 6));
        
        orders.push({
          userId: student._id.toString(),
          userName: student.userName,
          userEmail: student.userEmail,
          orderStatus: "confirmed",
          paymentMethod: Math.random() > 0.5 ? "paypal" : "stripe",
          paymentStatus: "paid",
          orderDate: randomDate,
          paymentId: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          payerId: `PAYER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          instructorId: course.instructorId,
          instructorName: course.instructorName,
          courseImage: course.image,
          courseTitle: course.title,
          courseId: course._id.toString(),
          coursePricing: course.pricing.toString()
        });
      }
    }
    
    const createdOrders = await Order.insertMany(orders);
    console.log(`${createdOrders.length} orders created successfully`);
    return createdOrders;
  } catch (error) {
    console.error("Error seeding orders:", error);
    return [];
  }
}

async function seedStudentCourses(createdUsers, createdCourses, createdOrders) {
  try {
    const students = createdUsers.filter(user => user.role === "student");
    const studentCourses = [];
    
    for (const student of students) {
      // Get all orders for this student
      const studentOrders = createdOrders.filter(order => order.userId === student._id.toString());
      
      // Create course records based on actual orders
      const enrolledCourses = studentOrders.map(order => ({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage
      }));
      
      if (enrolledCourses.length > 0) {
        studentCourses.push({
          userId: student._id.toString(),
          courses: enrolledCourses
        });
      }
    }
    
    const createdStudentCourses = await StudentCourses.insertMany(studentCourses);
    console.log(`${createdStudentCourses.length} student course records created successfully`);
    return createdStudentCourses;
  } catch (error) {
    console.error("Error seeding student courses:", error);
    return [];
  }
}

async function seedProgress(createdUsers, createdCourses, createdOrders) {
  try {
    const students = createdUsers.filter(user => user.role === "student");
    const progressRecords = [];
    
    for (const student of students) {
      // Get courses this student has enrolled in
      const studentOrders = createdOrders.filter(order => order.userId === student._id.toString());
      
      for (const order of studentOrders) {
        const course = createdCourses.find(c => c._id.toString() === order.courseId);
        if (!course) continue;
        
        // Random progress completion (0-100%)
        const progressPercentage = Math.random();
        const lecturesCompleted = Math.floor(course.curriculum.length * progressPercentage);
        
        const lecturesProgress = course.curriculum.map((lecture, index) => {
          const isViewed = index < lecturesCompleted;
          let dateViewed = null;
          
          if (isViewed) {
            // Random date between order date and now
            const orderDate = new Date(order.orderDate);
            const now = new Date();
            const timeDiff = now.getTime() - orderDate.getTime();
            const randomTime = Math.random() * timeDiff;
            dateViewed = new Date(orderDate.getTime() + randomTime);
          }
          
          return {
            lectureId: lecture._id.toString(),
            viewed: isViewed,
            dateViewed: dateViewed
          };
        });
        
        const isCompleted = lecturesCompleted === course.curriculum.length;
        let completionDate = null;
        
        if (isCompleted) {
          // Set completion date to last lecture viewed date
          const lastViewedDate = lecturesProgress
            .filter(lp => lp.dateViewed)
            .map(lp => new Date(lp.dateViewed))
            .sort((a, b) => b - a)[0];
          completionDate = lastViewedDate || new Date();
        }
        
        progressRecords.push({
          userId: student._id.toString(),
          courseId: course._id.toString(),
          completed: isCompleted,
          completionDate: completionDate,
          lecturesProgress: lecturesProgress
        });
      }
    }
    
    const createdProgress = await Progress.insertMany(progressRecords);
    console.log(`${createdProgress.length} progress records created successfully`);
    return createdProgress;
  } catch (error) {
    console.error("Error seeding progress:", error);
    return [];
  }
}

// Add this function to populate courses with enrolled students
async function populateCoursesWithStudents(createdOrders) {
  try {
    console.log("Populating courses with enrolled students...");
    
    // Group orders by courseId
    const courseStudents = {};
    
    for (const order of createdOrders) {
      if (!courseStudents[order.courseId]) {
        courseStudents[order.courseId] = [];
      }
      
      courseStudents[order.courseId].push({
        studentId: order.userId,
        studentName: order.userName,
        studentEmail: order.userEmail,
        paidAmount: order.coursePricing
      });
    }
    
    // Update each course with its enrolled students
    let updatedCourses = 0;
    for (const courseId in courseStudents) {
      await Course.findByIdAndUpdate(courseId, {
        students: courseStudents[courseId]
      });
      updatedCourses++;
    }
    
    console.log(`${updatedCourses} courses updated with student enrollment data`);
    return updatedCourses;
  } catch (error) {
    console.error("Error populating courses with students:", error);
    return 0;
  }
}

async function seedDatabase() {
  try {
    await connectDB();
    
    console.log("Starting database seeding...");
    
    await clearDatabase();
    
    const createdUsers = await seedUsers();
    const createdCourses = await seedCourses(createdUsers);
    const createdOrders = await seedOrders(createdUsers, createdCourses);
    const createdStudentCourses = await seedStudentCourses(createdUsers, createdCourses, createdOrders);
    const createdProgress = await seedProgress(createdUsers, createdCourses, createdOrders);
    
    // CRITICAL: Update courses with enrolled students (this was missing!)
    const updatedCoursesCount = await populateCoursesWithStudents(createdOrders);
    
    console.log("\n=== Database Seeding Complete ===");
    console.log(`✅ Users: ${createdUsers.length}`);
    console.log(`✅ Courses: ${createdCourses.length}`);
    console.log(`✅ Orders: ${createdOrders.length}`);
    console.log(`✅ Student Courses: ${createdStudentCourses.length}`);
    console.log(`✅ Progress Records: ${createdProgress.length}`);
    console.log(`✅ Courses Updated with Students: ${updatedCoursesCount}`);
    
    console.log("\n=== Test User Credentials ===");
    console.log("Sample Instructors:");
    console.log("  Email: john.smith@instructor.com | Password: password123");
    console.log("  Email: sarah.johnson@instructor.com | Password: password123");
    console.log("  Email: michael.chen@instructor.com | Password: password123");
    console.log("\nSample Students:");
    console.log("  Email: alex.thompson@student.com | Password: password123");
    console.log("  Email: maria.garcia@student.com | Password: password123");
    console.log("  Email: james.miller@student.com | Password: password123");
    console.log("  Email: emma.davis@student.com | Password: password123");
    console.log("\n=== Course Categories ===");
    console.log("📚 Web Development, Backend Development, Programming");
    console.log("🤖 Data Science, Mobile Development, Game Development");
    console.log("🎨 UI/UX Design, DevOps, Cybersecurity");
    console.log("📈 Marketing, Full Stack, Cloud Computing");
    console.log("\n=== Features ===");
    console.log("• Real Unsplash images for all courses");
    console.log("• Sample video URLs for course content");
    console.log("• Realistic enrollment patterns (1-4 courses per student)");
    console.log("• Varied progress completion (0-100%)");
    console.log("• Multiple payment methods and order history");
    
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };