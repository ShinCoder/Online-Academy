import bcrypt from 'bcryptjs';

const saltRounds = 10;

console.log(bcrypt.hashSync('12345', saltRounds));
console.log(bcrypt.compareSync('12345', '$2a$10$cAlWIIV.aGd/Zts0glh34eKYBSK7PlTVOdHv2WlqJINI6ngIT8y6W'));