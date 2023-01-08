import emailValidator from 'email-validator';
import moment from 'moment';

import usersService from "../../services/users.service";
import otpsService from '../../services/otps.service.js';

import myFunction from '../../library/index.js';

import mail from '../../mail/index.js';

export default {
  async updateProfile(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name) {
        return res.render('pages/user/profile', {
          error: 'First name cannot be empty.'
        });
      }

      if (!last_name) {
        return res.render('pages/user/profile', {
          error: 'Last name cannot be empty.'
        });
      }

      if (!email) {
        return res.render('pages/user/profile', {
          error: 'Email cannot be empty.'
        });
      }

      if (!emailValidator.validate(email)) {
        return res.render('pages/user/profile', {
          error: 'Invalid email.'
        });
      }

      if (!password) {
        return res.render('pages/user/profile', {
          error: 'Password cannot be empty.'
        });
      }

      const current_user = await usersService.findByKey({
        id: req.session.authUser.id
      })

      if (!current_user.length) {
        return res.redirect('./logout');
      }

      if (current_user[0].email != email) {
        const found_user = await usersService.findByKey({
          email: req.body.email
        });
  
        if (found_user.length) {
          return res.render('pages/user/profile', {
            error: 'This email had been existed. Please use another email.'
          });
        }
      }

      const new_time = await moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      const otp = await myFunction.generateString(6);

      const sent = await mail.sendMail(email, 'Verify email address', 'http://localhost:3000/auth/otp/' + otp);

      if (!sent) {
        return res.render('pages/user/profile', {
          error: 'Fail to send mail.'
        });
      }

      const new_otp = await otpsService.add({
        user_id: current_user[0].id,
        code: otp,
        type: 'verify-email',
        created_at: new_time,
        expired_at: await moment(Date.now() + 3600 * 1000).format('YYYY-MM-DD HH:mm:ss'),
      });

      if (!new_otp) {
        return res.render('pages/user/profile', {
          error: 'Cannot create otp. Please try later or contact admin.'
        });
      }

      const updated_user = await usersService.update({
        id: current_user[0].id,
        email: email, 
        first_name: first_name, 
        last_name: last_name,
        verified_at: null,
        updated_at: new_time
      })
      
      if (!updated_user) {
        return res.render('pages/user/profile', {
          error: 'Update profile fail. Please try again or contact admin.'
        });
      }

      return res.render('pages/user/profile', {
        success: 'Update profile successfull. Please verify your email to keep login.'
      }); 
    }
    catch(error) {
      console.log(error);

      return res.render('pages/user/profile', {
        error: 'Something went wrong. Please try later or contact admin.'
      }); 
    }
  }
}