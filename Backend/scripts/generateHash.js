import bcryptjs from 'bcryptjs';

const password = 'admin123';

bcryptjs.hash(password, 10).then(hashedPassword => {
    console.log('\nAdmin Credentials:');
    console.log('Email:', 'admin@lifecare.com');
    console.log('Password:', password);
    console.log('Hashed Password:', hashedPassword);
    console.log('\nUse these credentials to login to the admin panel.\n');
});

// Check if user 'tahoun@example.com' is registered
// Run this SQL query in your PostgreSQL database
const sqlQuery = "SELECT * FROM users WHERE email = 'tahoun@example.com';";
console.log(sqlQuery);