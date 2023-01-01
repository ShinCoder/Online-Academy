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
    }
  ],
  students: [
    {
      user_id: 2,
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
    }
  ],
  categories: [
    {
      id: 1,
      name: 'Information Technology'
    },
    {
      id: 2,
      name: 'Web Development',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/2.png'
    },
    {
      id: 3,
      name: 'Python',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/3.png'
    },
    {
      id: 4,
      name: 'Excel',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/4.png'
    },
    {
      id: 5,
      name: 'Javascript',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/5.png'
    },
    {
      id: 6,
      name: 'Data Science',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/6.png'
    },
    {
      id: 7,
      name: 'AWS Certification',
      parent_category_id: 1,
      banner_url: '/images/categories_banner/7.png'
    },
    {
      id: 8,
      name: 'Art'
    },
    {
      id: 9,
      name: 'Drawing',
      parent_category_id: 8,
      banner_url: '/images/categories_banner/9.png'
    }
  ],
  courses: [
    {
      id: 1,
      name: 'Html, css',
      lecturer_id: 3,
      banner_url: '/images/courses_banner/1.png',
      category_id: 2,
      price: '0',
      status: 'INCOMPLETE',
      short_description: 'Html and css',
      detail_description: 'Html and css from zero to hero',
      syllabus: '1.Html\n2.Css',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'html-css'
    },
    {
      id: 2,
      name: 'Javascript cơ bản',
      lecturer_id: 3,
      banner_url: '/images/courses_banner/2.png',
      category_id: 5,
      price: '0',
      status: 'INCOMPLETE',
      short_description: 'Javascript cơ bản',
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
      banner_url: '/images/courses_banner/3.png',
      category_id: 3,
      price: '999000',
      status: 'INCOMPLETE',
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
      banner_url: '/images/courses_banner/4.png',
      category_id: 2,
      price: '199000',
      status: 'INCOMPLETE',
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
