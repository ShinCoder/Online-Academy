import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';
import moment from 'moment';

import usersService from '../../services/users.service.js';
import otpsService from '../../services/otps.service.js';

import myFunction from '../../library/index.js';

import mail from '../../mail/index.js';


export default {
  getSignIn(req, res) {
    res.render('pages/auth/sign-in');
  },
  async postSignIn(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.render('pages/auth/sign-up', {
          error: 'Email cannot be empty.'
        });
      }

      if (!emailValidator.validate(email)) {
        return res.render('pages/auth/sign-up', {
          error: 'Invalid email.'
        });
      }

      if (!password) {
        return res.render('pages/auth/sign-up', {
          error: 'Password cannot be empty.'
        });
      }

      const found_user = await usersService.findByKey({
        email: req.body.email
      });

      if (!found_user.length) {
        return res.render('pages/auth/sign-in', {
          error: 'This email hadn\'t signed up. Please use sign up instead.'
        });
      }

      if (!found_user[0].verified_at) {
        return res.render('pages/auth/sign-in', {
          error: 'This email hadn\'t verified. Please check your mail to verify.'
        });
      }

      if(!await bcrypt.compareSync(password, found_user[0].password)) {
        return res.render('pages/auth/sign-in', {
          error: 'Invalid password. Try recovery password if you forgot password.'
        });
      }

      delete found_user[0].password;

      req.session.auth = true;
      req.session.authUser = found_user[0];

      return res.render('pages/auth/sign-in', {
        success: 'Sign in successfully. Redirecting to dashboard in 5s ...'
      });
    }
    catch (error) {
      return res.render('pages/auth/sign-in', {
        error: 'Something went wrong. Please try later or contact admin.'
      });
    }
  },
  getSignUp(req, res) {
    res.render('pages/auth/sign-up');
  },
  async postSignUp(req, res) {
    try {
      const { first_name, last_name, email, password, confirm_password } = req.body;

      if (!first_name) {
        return res.render('pages/auth/sign-up', {
          error: 'First name cannot be empty.'
        });
      }

      if (!last_name) {
        return res.render('pages/auth/sign-up', {
          error: 'Last name cannot be empty.'
        });
      }

      if (!email) {
        return res.render('pages/auth/sign-up', {
          error: 'Email cannot be empty.'
        });
      }

      if (!emailValidator.validate(email)) {
        return res.render('pages/auth/sign-up', {
          error: 'Invalid email.'
        });
      }

      if (!password) {
        return res.render('pages/auth/sign-up', {
          error: 'Password cannot be empty.'
        });
      }

      if (!confirm_password) {
        return res.render('pages/auth/sign-up', {
          error: 'Confirm password cannot be empty.'
        });
      }

      if (password != confirm_password) {
        return res.render('pages/auth/sign-up', {
          error: 'Password and Confirm password must be same.'
        });
      }

      const found_user = await usersService.findByKey({
        email: req.body.email
      });

      if (found_user.length) {
        return res.render('pages/auth/sign-up', {
          error: 'This email had signed up. Please use sign in instead.'
        });
      }

      const new_time = await moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      const otp = await myFunction.generateString(6);

      const sent = await mail.sendMail(email, 'Verify email address', 'http://localhost:3000/auth/otp/' + otp);

      if (!sent) {
        return res.render('pages/auth/sign-up', {
          error: 'Fail to send mail.'
        });
      }

      const new_user = await usersService.add({
        email: email,
        first_name: first_name,
        last_name: last_name, 
        password: await bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        created_at: new_time,
        updated_at: new_time,
      });

      if (!new_user) {
        return res.render('pages/auth/sign-up', {
          error: 'Cannot create account. Please try later or contact admin.'
        });
      }

      const new_otp = await otpsService.add({
        user_id: new_user[0],
        code: otp,
        type: 'verify-email',
        created_at: new_time,
        expired_at: await moment(Date.now() + 3600 * 1000).format('YYYY-MM-DD HH:mm:ss'),
      });

      if (!new_otp) {
        return res.render('pages/auth/sign-up', {
          error: 'Cannot create otp. Please try later or contact admin.'
        });
      }

      return res.render('pages/auth/sign-up', {
        success: 'Sign up successfully. Please check your mail to activiate your account. Redirecting to sign in page in 5s ...'
      });
    }
    catch (error) {
      return res.render('pages/auth/sign-up', {
        error: 'Something went wrong. Please try later or contact admin.'
      });
    }
  },
  getRecoveryPassword(req, res) {
    res.render('pages/auth/recovery-password');
  },
  async postRecoveryPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.render('pages/auth/sign-up', {
          error: 'Email cannot be empty.'
        });
      }

      if (!emailValidator.validate(email)) {
        return res.render('pages/auth/sign-up', {
          error: 'Invalid email.'
        });
      }

      const found_user = await usersService.findByKey({
        email: req.body.email
      });

      if (!found_user.length) {
        return res.render('pages/auth/sign-in', {
          error: 'This email hadn\'t signed up. Please use sign up instead.'
        });
      }

      if (!found_user[0].verified_at) {
        return res.render('pages/auth/sign-in', {
          error: 'This email hadn\'t verified. Please check your mail to verify.'
        });
      }

      const found_otp = await otpsService.findByKey({user_id: found_user[0].id, type: 'recovery-password', used: 0});

      if (found_otp.length) {
        const sent = await mail.sendMail(email, 'Recovery password', 'http://localhost:3000/auth/otp/' + found_otp[0].code);

        if (!sent) {
          return res.render('pages/auth/sign-up', {
            error: 'Fail to send mail.'
          });
        }

        return res.render('pages/auth/recovery-password', {
          success: 'Recovery password mail had been resent.'
        });
      }

      const otp = await myFunction.generateString(6);
      const sent = await mail.sendMail(email, 'Recovery password', 'http://localhost:3000/auth/otp/' + otp);

      if (!sent) {
        return res.render('pages/auth/sign-up', {
          error: 'Fail to send mail.'
        });
      }

      const new_otp = await otpsService.add({
        user_id: found_user[0].id,
        code: otp,
        type: 'recovery-password',
        created_at: await moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        expired_at: await moment(Date.now() + 3600 * 1000).format('YYYY-MM-DD HH:mm:ss'),
      });

      if (!new_otp) {
        return res.render('pages/auth/sign-up', {
          error: 'Cannot create otp. Please try later or contact admin.'
        });
      }

      return res.render('pages/auth/recovery-password', {
        success: 'Recovery password mail had been sent successfully. Please check your mail. Redirecting to sign in page in 5s ...'
      });
    }
    catch (error) {
      console.log(error);

      return res.render('pages/auth/recovery-password', {
        error: 'Something went wrong. Please try later or contact admin.'
      });
    }
  },
  async getOtp(req, res) {
    try {
      const { id: otp } = req.params;

      if (!otp) {
        return res.render('pages/auth/otp', {
          error: 'Empty otp. Please check your mail for the link.'
        });
      }

      const found_otp = await otpsService.findByKey({
        code: otp,
        used: 0
      });

      if (!found_otp.length) {
        return res.render('pages/auth/otp', {
          error: 'Empty otp. Please check your mail for the link.'
        });
      }

      const new_time = await moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      const updated_otp = await otpsService.update(found_otp[0].id, { used: 1 });

      if (!updated_otp) {
        return res.render('pages/auth/otp', {
          error: 'Verified fail. Please try again.'
        });
      }

      if (found_otp[0].type == 'recovery-password') {
        const new_password = await myFunction.generateString(12);
        const updated_user = await usersService.update(found_otp[0].user_id, { password: await bcrypt.hashSync(new_password, bcrypt.genSaltSync(10)), updated_at: new_time });

        if (!updated_user) {
          return res.render('pages/auth/otp', {
            error: 'Verified fail. Please try again.'
          });
        }

        return res.render('pages/auth/otp', {
          success: 'Recovery password successfull. Your new password: ' + new_password
        });
      }

      if (found_otp[0].type == 'verify-email') {
        const updated_user = await usersService.update(found_otp[0].user_id, { verified_at: new_time});

        if (!updated_user) {
          return res.render('pages/auth/otp', {
            error: 'Verified fail. Please try again.'
          });
        }

        return res.render('pages/auth/otp', {
          success: 'Verify successfully. You can close this tab now.'
        });
      }
      
      return res.render('pages/auth/otp', {
        error: 'Invalid verification. Please try again.'
      });
    }
    catch (error) {
      return res.render('pages/auth/otp', {
        error: 'Something went wrong. Please try later or contact admin.'
      });
    }
  }
}