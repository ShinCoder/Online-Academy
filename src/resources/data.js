import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const data = {
  users: [
    {
      id: 1,
      username: 'admin1',
      email: 'admin1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'ADMIN'
    },
    {
      id: 2,
      username: 'student1',
      email: 'student1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'STUDENT'
    },
    {
      id: 3,
      username: 'lecturer1',
      email: 'lecturer1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    },
    {
      id: 4,
      username: 'Avinash_Jain',
      email: 'avinashjain@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    },
    {
      id: 5,
      username: 'Mark_Lassoff',
      email: 'marklassoff@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    },
    {
      id: 6,
      username: 'Stone_River_eLearning',
      email: 'stoneriverelearning@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    },
    {
      id: 7,
      username: 'student2',
      email: 'student2@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'STUDENT'
    },
    {
      id: 8,
      username: 'John_Purcell',
      email: 'johnpurcell@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    }
  ],
  students: [
    {
      user_id: 2,
      first_name: 'Kiệt',
      last_name: 'Trần'
    },
    {
      user_id: 7,
      first_name: 'Kiệt',
      last_name: 'Trần'
    }
  ],
  lecturers: [
    {
      user_id: 3,
      first_name: 'Sơn',
      last_name: 'Đặng'
    },
    {
      user_id: 4,
      first_name: 'Avinash',
      last_name: 'Jain'
    },
    {
      user_id: 5,
      first_name: 'Mark',
      last_name: 'Lassoff'
    },
    {
      user_id: 6,
      first_name: 'Stone River',
      last_name: 'elearning'
    },
    {
      user_id: 8,
      first_name: 'John',
      last_name: 'Purcell'
    }
  ],
  categories: [
    {
      id: 1,
      name: 'Development'
    },
    {
      id: 2,
      name: 'Web Development',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/2.png'
    },
    // {
    //   id: 3,
    //   name: 'Python',
    //   parent_category_id: 1,
    //   banner_url: '/images/categories_banner/3.png'
    // },
    // {
    //   id: 4,
    //   name: 'Excel',
    //   parent_category_id: 1,
    //   banner_url: '/images/categories_banner/4.png'
    // },
    // {
    //   id: 5,
    //   name: 'Javascript',
    //   parent_category_id: 1,
    //   banner_url: '/images/categories_banner/5.png'
    // },
    {
      id: 3,
      name: 'Data Science',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/3.png'
    },
    // {
    //   id: 7,
    //   name: 'AWS Certification',
    //   parent_category_id: 1,
    //   banner_url: '/images/categories_banner/7.png'
    // },
    {
      id: 4,
      name: 'Art & Craft'
    },
    {
      id: 5,
      name: 'Drawing',
      parent_category_id: 4,
      banner_url: '/images/categories_banner/5.png'
    },
    {
      id: 6,
      name: 'Office Productivity'
    },
    {
      id: 7,
      name: 'Microsoft',
      parent_category_id: 6,
      banner_url: '/images/categories_banner/7.png'
    },
    {
      id: 8,
      name: 'Google',
      parent_category_id: 6,
      banner_url: '/images/categories_banner/8.png'
    },
    {
      id: 9,
      name: 'Mobile Development',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/9.png'
    },
    {
      id: 10,
      name: 'Programming Languages',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/10.png'
    },
    {
      id: 11,
      name: 'Design'
    },
    {
      id: 12,
      name: 'Graphic Design',
      parent_category_id: 11,
      banner_url: '/images/categories_banner/12.png'
    },
    {
      id: 13,
      name: 'User Experience Design',
      parent_category_id: 11,
      banner_url: '/images/categories_banner/13.png'
    }
  ],
  courses: [
    {
      id: 1,
      name: 'HTML CSS từ Zero đến Hero',
      lecturer_id: 3,
      banner_filename: '1.png',
      category_id: 2,
      price: '0',
      is_completed: 'INCOMPLETE',
      short_description:
        'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.',
      detail_description: 'Html and css from zero to hero',
      syllabus: '1.Html\n2.Css',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'html-css'
    },
    {
      id: 2,
      name: 'Lập Trình JavaScript Cơ Bản',
      lecturer_id: 3,
      banner_filename: '2.png',
      category_id: 2,
      price: '0',
      is_completed: 'INCOMPLETE',
      short_description:
        'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.',
      detail_description: 'Javascript cơ bản cho người mới bắt đầu',
      syllabus: '1.Javascript',
      created_at: new Date('2022-08-03')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'javascript-co-ban'
    },
    {
      id: 3,
      name: 'Learn Python: The Complete Python Programming Course',
      lecturer_id: 4,
      banner_filename: '3.png',
      category_id: 3,
      price: '999000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!',
      detail_description:
        'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games',
      syllabus: '',
      created_at: new Date('2022-11-25')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'learn-python-the-complete-python-programming-course'
    },
    {
      id: 4,
      name: 'Become a Certified HTML, CSS, JavaScript Web Developer',
      lecturer_id: 5,
      banner_filename: '4.png',
      category_id: 2,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications',
      detail_description:
        'Prepare for Industry Certification Exam\nEarn Certification that is Proof of your Competence\nHours and Hours of Video Instruction\nDozens of Code Examples to Download and Study\nOver 25 Engaging Lab Exercises\nAll Lab Solutions\nInstructor Available by Email or on the Forums\nAll Free Tools\nComprehensive Coverage of HTML and CSS\nClient Side Programming with Javascript\nServer Side Development with PHP\nLearn Database Development with mySQL',
      syllabus: '',
      created_at: new Date('2022-12-05')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2022-12-24')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
      // slug: 'learn-python-the-complete-python-programming-course'
    },
    {
      id: 5,
      name: 'Google Sheets Fundamentals',
      lecturer_id: 5,
      banner_filename: '5.png',
      category_id: 8,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description: "Master Google's Spreadsheet Program",
      detail_description:
        'Competently navigate the Google Sheets Interface and successfully enter data\nFormat spreadsheets so that they are both readable and attractive\nCreate formulas and use built-in Spreadsheet functions\nManage spreadsheet data and apply filters and sorts\nOutput, Use Collaboration Tools and Export Spreadsheets',
      syllabus: '',
      created_at: new Date('2021-06-15')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2021-10-24')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 6,
      name: 'JavaScript 2019: JavaScript ES6 Certification Course',
      lecturer_id: 5,
      banner_filename: '6.png',
      category_id: 2,
      price: '249000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Earn the JavaScript Specialist Certification while Learning JavaScript ES6',
      detail_description:
        'JavaScript syntax, style and usage with a focus on developing apps\nBe Current with ES6 Syntax and Usage\nFundamental to Advanced JavaScript Concepts including Promises, Classes, and Arrow Functions\nIntegration of JavaScript with HTML5 Code for Web Applications',
      syllabus: '',
      created_at: new Date('2020-06-25')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-10-24')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 7,
      name: 'Responsive Design for Web Designers',
      lecturer_id: 5,
      banner_filename: '7.png',
      category_id: 2,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Learn How to Create Flexible Designs for a Multi-Screen World',
      detail_description:
        'Identify the four elements of responsive Design\nUnderstand and use a mobile-first design approach\nUnderstand how and why to design with fluid content grids\nUnderstand how content scale impacts responsive design\nExecute cross-device preview and testing to ensure designs work on different sized screens\nUtilize the meta tags required in code for responsive design\nWork with the <picture> tag to create responsive images\nCreate media queries that alter designs for multiple size screens',
      syllabus: '',
      created_at: new Date('2021-06-25')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2021-11-24')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 8,
      name: 'Build Android Apps with App Inventor 2 - No Coding Required',
      lecturer_id: 6,
      banner_filename: '8.png',
      category_id: 9,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Android application,App Inventor 2,Google Play Store,Basic Programming',
      detail_description:
        'Create Android Applications using App Inventor 2.\nUnderstand how to publish created applications to the Google Play Store.\nUnderstand how to update created applications once they have been published to the Google Play Store.\nNavigate and use the App Inventor 2 interface fluidly, effectively and efficiently.\nUnderstand the basics of programming.',
      syllabus: '',
      created_at: new Date('2020-07-25')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-12-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 9,
      name: 'Microsoft Office 365 Administration',
      lecturer_id: 6,
      banner_filename: '9.png',
      category_id: 7,
      price: '229000',
      is_completed: 'INCOMPLETE',
      short_description: 'Microsoft Office 365 Administration',
      detail_description:
        'Setup a custom domain on on microsoft\nUnderstand the basics of the integrated applications\nCheck service health\nCheck and log service requests\nGenerate customized reports\nCreate and manage users in Microsoft Office 365\nCreate security groups\nImport users\nMigrate mail to Office 365 Outlook\nManage spam and malware',
      syllabus: '',
      created_at: new Date('2020-07-29')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-12-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 10,
      name: 'Learn PHP Programming From Scratch',
      lecturer_id: 6,
      banner_filename: '10.png',
      category_id: 10,
      price: '249000',
      is_completed: 'INCOMPLETE',
      short_description: 'Over 50 hours of PHP programming goodness.',
      detail_description:
        'Demonstrate understanding of PHP programming\nTo learn the basics of PHP programming\nTo learn PHP programming by working on projects\nTo learn intermediate and advanced PHP programming',
      syllabus: '',
      created_at: new Date('2021-02-12')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2021-05-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 11,
      name: 'Become a Professional Graphic Designer',
      lecturer_id: 6,
      banner_filename: '11.png',
      category_id: 12,
      price: '229000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Learn what you need to know to break into the world of graphic design.',
      detail_description:
        'To learn what graphic design is and how to become a graphic designer\nLearn what a graphic designer does on the job\nLearn the principles of great graphic design\nLearn graphic design as it relates to Photoshop, Illustrator, InDesign and Acrobat\nLearn graphic design for the web using Dreamweaver\nLearn visual communication fundamentals\nLearn successful layout in graphic design\nLearn how to get a job as a graphic designer',
      syllabus: '',
      created_at: new Date('2020-05-22')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-09-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 12,
      name: 'Mobile UI and UX Design',
      lecturer_id: 6,
      banner_filename: '12.png',
      category_id: 13,
      price: '229000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Make your mobile UI design pop and understand the mobile UX process',
      detail_description:
        "At the end of this course, students will be equipped to oversee design a mobile application's\nexperience and interface, through the full process which includes:\nRequirements Assessment\nDesign Project Planning\nUser Experience Recommendations\nUser Interface Design & Documentation\nDesign Implementation Guidelines & Management",
      syllabus: '',
      created_at: new Date('2017-01-22')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2017-02-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 13,
      name: 'Become a Professional Web Developer | Version 3.0',
      lecturer_id: 6,
      banner_filename: '13.png',
      category_id: 2,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Everything you need to know to become a professional web developer from scratch, updated for modern development.',
      detail_description:
        'To learn every skill needed as a professional web developer/designer\nTo create real life projects for your portfolio\nTo become a professional web developer',
      syllabus: '',
      created_at: new Date('2020-02-12')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-08-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 14,
      name: 'Learn Pascal Programming from Scratch',
      lecturer_id: 6,
      banner_filename: '14.png',
      category_id: 10,
      price: '199000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Create, maintain, design, and build cross-platform native applications',
      detail_description:
        'Create, maintain, design, and build cross-platform native applications.\nYou will learn how to write the code once, compile it, and run it on multiple platforms.',
      syllabus: '',
      created_at: new Date('2016-12-31')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2017-02-24')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 15,
      name: 'Java Swing (GUI) Programming: From Beginner to Expert',
      lecturer_id: 8,
      banner_filename: '15.png',
      category_id: 10,
      price: '249000',
      is_completed: 'INCOMPLETE',
      short_description:
        'Learn how to create desktop and Internet GUI Java programs and take your Java programming to the next level.',
      detail_description:
        'Learn how to write GUI (graphical user interface) applications in Java\nUnderstand the Java Swing framework\nDiscover how to create database applications',
      syllabus: '',
      created_at: new Date('2015-06-21')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2015-08-14')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 16,
      name: 'Learn Advanced C++ Programming',
      lecturer_id: 8,
      banner_filename: '16.png',
      category_id: 10,
      price: '229000',
      is_completed: 'INCOMPLETE',
      short_description:
        "Discover intermediate to advanced C++, including C++ 11's fantastic additions to the C++ standard.",
      detail_description:
        'Develop complex C++ applications\nUnderstand C++ 11\nBe in a position to apply for jobs requiring good C++ knowledge',
      syllabus: '',
      created_at: new Date('2022-04-13')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2022-06-23')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 17,
      name: 'Java 11 For Complete Beginners',
      lecturer_id: 8,
      banner_filename: '17.png',
      category_id: 10,
      price: '229000',
      is_completed: 'INCOMPLETE',
      short_description: 'Learn Modern Java From Scratch',
      detail_description: 'Computer programming in Java',
      syllabus: '',
      created_at: new Date('2020-01-04')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2020-04-30')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 18,
      name: 'Responsive Với Grid System',
      lecturer_id: 3,
      banner_filename: '18.png',
      category_id: 2,
      price: '0',
      is_completed: 'INCOMPLETE',
      short_description:
        'Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4.',
      detail_description:
        'Biết cách xây dựng website Responsive\nHiểu được tư tưởng thiết kế với Grid system\nTự tay xây dựng được thư viện CSS Grid\nTự hiểu được Grid layout trong bootstrap',
      syllabus: '',
      created_at: new Date('2020-11-09')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      updated_at: new Date('2021-01-12')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      id: 19,
      name: 'Lập Trình JavaScript Nâng Cao',
      lecturer_id: 3,
      banner_filename: '19.png',
      category_id: 2,
      price: '0',
      is_completed: 'INCOMPLETE',
      short_description:
        'Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ...',
      detail_description:
        'Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí\nCác kiến thức nâng cao của Javascript giúp code trở nên tối ưu hơn\nHiểu được cách tư duy nâng cao của các lập trình viên có kinh nghiệm\nHiểu được các khái niệm khó như từ khóa this, phương thức bind, call, apply & xử lý bất đồng bộ\nCó nền tảng Javascript vững chắc để làm việc với mọi thư viện, framework viết bởi Javascript\nNâng cao cơ hội thành công khi phỏng vấn xin việc nhờ kiến thức chuyên môn vững chắc',
      syllabus: '',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      id: 20,
      name: 'Node & ExpressJS',
      lecturer_id: 3,
      banner_filename: '20.png',
      category_id: 2,
      price: '0',
      is_completed: 'INCOMPLETE',
      short_description:
        'Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.',
      detail_description:
        'Nắm chắc lý thuyết chung trong việc xây dựng web\nBiết cách làm việc với Mongoose, MongoDB trong NodeJS\nXây dựng web với Express bằng kiến thức thực tế\nBiết cách xây dựng API theo chuẩn RESTful API\nNắm chắc lý thuyết về API và RESTful API\nĐược chia sẻ lại kinh nghiệm làm việc thực tế\nNắm chắc khái niệm về giao thức HTTP\nHiểu rõ tư tưởng và cách hoạt động của mô hình MVC\nHọc được cách tổ chức code trong thực tế\nBiết cách deploy (triển khai) website lên internet',
      syllabus: '',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ],
  enroll: [
    {
      student_id: 2,
      course_id: 1,
      status: 'LEARNING',
      rate_point: 4,
      enroll_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      student_id: 7,
      course_id: 2,
      status: 'LEARNING',
      rate_point: 2,
      enroll_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      student_id: 2,
      course_id: 2,
      status: 'LEARNING',
      rate_point: 5,
      enroll_date: new Date('2022-12-20')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      student_id: 2,
      course_id: 3,
      status: 'LEARNING',
      rate_point: 3,
      enroll_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]
};

export default data;
