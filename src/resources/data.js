import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const data = {
  users: [
    {
      id: '1',
      username: 'admin1',
      email: 'admin1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'ADMIN'
    },
    {
      id: '2',
      username: 'student1',
      email: 'student1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'STUDENT'
    },
    {
      id: '3',
      username: 'lecturer1',
      email: 'lecturer1@gmail.com',
      identity: bcrypt.hashSync('12345'),
      authority: 'LECTURER'
    }
  ],
  students: [
    {
      user_id: '2',
      first_name: 'Kiệt',
      last_name: 'Trần'
    }
  ],
  lecturers: [
    {
      user_id: '3',
      first_name: 'Sơn',
      last_name: 'Đặng'
    }
  ],
  categories: [
    {
      id: '1',
      name: 'information technology'
    },
    {
      id: '2',
      name: 'web development',
      parent_category_id: '1'
    }
  ],
  courses: [
    {
      id: '1',
      name: 'Html, css',
      lecturer_id: '3',
      banner_url: '/images/html-css.png',
      category_id: '1',
      price: '0',
      status: 'INCOMPLETE',
      short_description: 'Html and css',
      detail_description: 'Html and css from zero to hero',
      syllabus: '1.Html\n2.Css',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      slug: 'html-css'
    },
    {
      id: '2',
      name: 'Javascript cơ bản',
      lecturer_id: '3',
      banner_url: '/images/javascript-co-ban.png',
      category_id: '1',
      price: '0',
      status: 'INCOMPLETE',
      short_description: 'Javascript cơ bản',
      detail_description: 'Javascript cơ bản cho người mới bắt đầu',
      syllabus: '1.Javascript',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      slug: 'javascript-co-ban'
    }
  ]
};

export default data;
