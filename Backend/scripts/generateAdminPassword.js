import bcrypt from 'bcryptjs';

const password = 'admin123';
 
bcrypt.hash(password, 10).then(hash => {
    console.log('Hashed password for admin user:');
    console.log(hash);
}); 