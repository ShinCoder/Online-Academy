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
