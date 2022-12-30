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
      category_id: 2,
      price: '0',
      status: 'INCOMPLETE',
      short_description: 'Javascript cơ bản',
      detail_description: 'Javascript cơ bản cho người mới bắt đầu',
      syllabus: '1.Javascript',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'javascript-co-ban'
    },
    {
      id: 3,
      name: 'Learn Python: The Complete Python Programming Course',
      lecturer_id: 4,
      banner_url: '/images/courses_banner/3.png',
      category_id: 2,
      price: '999',
      status: 'INCOMPLETE',
      short_description:
        'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!',
      detail_description:
        'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games',
      syllabus: '',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      // slug: 'learn-python-the-complete-python-programming-course'
    }
  ],
  enroll: [
    {
      student_id: 2,
      course_id: 1,
      status: 'LEARNING',
      enroll_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      student_id: 2,
      course_id: 2,
      status: 'LEARNING',
      enroll_date: new Date('2022-12-20')
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    },
    {
      student_id: 2,
      course_id: 3,
      status: 'LEARNING',
      enroll_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]
};

export default data;
