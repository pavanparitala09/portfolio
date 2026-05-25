const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Bio = require('./models/Bio');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data (optional, but good for pure seed)
    await User.deleteMany({});
    await Bio.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});

    // 1. Seed Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword
    });
    await adminUser.save();
    console.log('Admin user seeded (admin / admin123)');

    // 2. Seed Bio
    const bioData = new Bio({
      name: "Paritala Pavan Kumar",
      roles: ['Full Stack Developer', 'React Developer', 'Node.js Developer', 'Problem Solver'],
      description: "I build high-performance web applications with clean code and scalable architecture. Passionate about delivering exceptional user experiences from backend to frontend.",
      aboutHeadline: "Passionate about building impactful digital experiences",
      aboutPara1: "I'm Paritala Pavan Kumar, a Computer Science student and passionate Full Stack Developer. I love turning complex problems into elegant, user-friendly solutions using modern web technologies.",
      aboutPara2: "From crafting responsive frontends with React to architecting robust backend systems with Node.js and MongoDB, I thrive across the entire web stack. I'm always eager to learn new technologies and best practices.",
      aboutPara3: "When I'm not coding, I enjoy exploring open-source projects, contributing to developer communities, and continuously sharpening my problem-solving skills.",
      email: "pavankumarparitala2580@gmail.com",
      github: "https://github.com/pavanparitala09",
      linkedin: "www.linkedin.com/in/pavankumar-paritala-aa733a29a"
    });
    await bioData.save();
    console.log('Bio seeded');

    // 3. Seed Projects
    const projectsData = [
      {
        title: 'Agro-Wallet',
        description: 'Built a full-stack web application for managing financial transactions and digital records using React, Node.js, and MongoDB. Implemented MVC architecture, secure authentication with HTTP-only cookies, and a responsive UI using Tailwind CSS.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'web',
        image: './image.png',
        github: 'https://github.com/pavanparitala09/Agro_Wallet',
        live: 'https://agro-wallet-rbowlucqr-paritala-pavan-kumars-projects.vercel.app',
        featured: true,
      },
      {
        title: 'Slack Clone',
        description: 'Implemented secure user authentication, including Google OAuth integration, and debugged backend server issues to ensure reliable API performance. Enhanced error handling, optimized database connections, and contributed to a scalable architecture supporting real-time messaging and collaboration.',
        tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        category: 'web',
        image: '/Screenshot 2026-04-03 092320.png',
        github: 'https://github.com/pavankumarparitala2580',
        live: '',
        featured: true,
      },
      {
        title: 'Food Delivery App',
        description: 'A React Native mobile app for food ordering with real-time order tracking, restaurant listings, and integrated payment gateway.',
        tags: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
        category: 'mobile',
        image: '/food_delivery.png',
        github: 'https://github.com/pavankumarparitala2580',
        live: '',
        featured: false,
      },
      {
        title: 'Student Result Portal',
        description: 'A web portal for students to view exam results, track academic performance, and download grade cards with admin management.',
        tags: ['React', 'Express', 'MongoDB', 'JWT', 'PDF'],
        category: 'web',
        image: '/student_portal.png',
        github: 'https://github.com/pavankumarparitala2580',
        live: '',
        featured: false,
      },
      {
        title: 'Fitness Tracker Mobile App',
        description: 'A cross-platform mobile application to track workouts, log daily nutrition, view progress charts, and set fitness goals.',
        tags: ['React Native', 'Node.js', 'MongoDB', 'Charts'],
        category: 'mobile',
        image: '/fitness_tracker.png',
        github: 'https://github.com/pavankumarparitala2580',
        live: '',
        featured: false,
      }
    ];
    await Project.insertMany(projectsData);
    console.log('Projects seeded');

    // 4. Seed Skills
    const skillsData = [
      {
        category: 'Frontend',
        iconName: 'FiLayout',
        items: [
          { name: 'React.js', level: 85 },
          { name: 'JavaScript (ES6+)', level: 88 },
          { name: 'HTML5 & CSS3', level: 90 },
          { name: 'React Native', level: 70 },
        ],
      },
      {
        category: 'Backend',
        iconName: 'FiServer',
        items: [
          { name: 'Node.js', level: 82 },
          { name: 'Express.js', level: 80 },
          { name: 'REST APIs', level: 85 },
          { name: 'Python', level: 65 },
        ],
      },
      {
        category: 'Database',
        iconName: 'FiDatabase',
        items: [
          { name: 'MongoDB', level: 80 },
          { name: 'MySQL', level: 70 },
          { name: 'Mongoose ODM', level: 78 },
          { name: 'Redis', level: 50 },
        ],
      },
      {
        category: 'Tools & Others',
        iconName: 'FiTerminal',
        items: [
          { name: 'Git & GitHub', level: 85 },
          { name: 'VS Code', level: 95 },
          { name: 'Postman', level: 80 },
          { name: 'Linux / CLI', level: 72 },
        ],
      }
    ];
    await Skill.insertMany(skillsData);
    console.log('Skills seeded');

    console.log('Database Seeding Completed Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
