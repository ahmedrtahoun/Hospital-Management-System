# Hospital Management System

A comprehensive full-stack Hospital Management System featuring separate frontend applications for patients and administrators. Built with modern web technologies including React, Node.js, and PostgreSQL.

## Live Demo

- [Admin Panel](https://lifecare-administration.netlify.app)
- [Patient Portal](https://lifecare-hospitals.netlify.app)

## Key Features

### Admin Panel
- **Doctor Management**: Register and manage doctor profiles
- **Admin Management**: Add and manage administrators
- **Appointment Management**: View, approve, or reject patient appointments
- **Patient Communication**: Read and respond to patient messages
- **Dashboard Analytics**: Overview of hospital operations

### Patient Portal
- **User Management**: Registration and secure login
- **Appointment Booking**: Schedule appointments with preferred doctors
- **Communication**: Direct messaging with hospital administration
- **Profile Management**: Update personal information and view medical history

## Technology Stack

- **Frontend**: React.js, Bootstrap, Vite
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **API Testing**: Postman

## Project Structure

```
Hospital-Management-System/
├── Backend/              # Node.js + Express backend
├── Frontend-Admin/       # React admin dashboard
└── Frontend-Patient/     # React patient portal
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- Cloudinary account for image storage

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
   ```sql
   CREATE DATABASE life_care_hospital;
   ```
3. Navigate to Backend directory and run the schema:
   ```bash
   psql -U your_username -d life_care_hospital -f database/schema.sql
   ```

### 2. Backend Setup

1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `config/config.env` with the following variables:
   ```env
   # Server Configuration
   PORT=4000

   # PostgreSQL Configuration
   PGUSER=your_postgres_username
   PGHOST=localhost
   PGDATABASE=life_care_hospital
   PGPASSWORD=your_postgres_password
   PGPORT=5432

   # JWT Configuration
   JWT_SECRET_KEY=your_jwt_secret_key
   JWT_EXPIRES=7d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend-Admin Setup

1. Navigate to Frontend-Admin directory:
   ```bash
   cd Frontend-Admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_SERVER_URL=http://localhost:4000
   VITE_CLOUDINARY_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. Start the admin frontend:
   ```bash
   npm run dev
   ```
   Access at: http://localhost:5173

### 4. Frontend-Patient Setup

1. Navigate to Frontend-Patient directory:
   ```bash
   cd Frontend-Patient
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_SERVER_URL=http://localhost:4000
   VITE_CLOUDINARY_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. Start the patient frontend:
   ```bash
   npm run dev
   ```
   Access at: http://localhost:5174

## Testing

### Default Admin Credentials
- Email: admin@gmail.com
- Password: 123456

### API Testing
- Use Postman or similar tools to test API endpoints
- Backend API documentation available at `/api-docs` endpoint

## Security Best Practices

1. Environment Variables:
   - Never commit `.env` files
   - Use strong, unique values for JWT secrets
   - Rotate API keys periodically

2. Authentication:
   - Use strong passwords
   - Implement rate limiting
   - Enable CORS protection

3. Data Protection:
   - Encrypt sensitive data
   - Regular database backups
   - Input validation and sanitization

## Troubleshooting

1. Database Connection Issues:
   - Verify PostgreSQL service is running
   - Check database credentials
   - Ensure proper schema installation

2. Frontend Connection Issues:
   - Verify backend URL in `.env` files
   - Check CORS settings
   - Clear browser cache

3. Image Upload Issues:
   - Verify Cloudinary credentials
   - Check upload preset configuration
   - Ensure proper file types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues, questions, or contributions:
1. Check existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Hospital Management System - Full Stack Project

This project is a comprehensive **Hospital Management System** featuring a responsive design for both administrators and patients. It includes a backend service and two separate frontend implementations for managing hospital operations and patient interactions.

## Features

### [Admin Panel:](https://lifecare-administration.netlify.app)
- **Doctor Management**: Register and manage doctor profiles.
- **Admin Management**: Add new administrators.
- **Appointment Management**: View, approve, or reject patient appointments.
- **Patient Messages**: Read and respond to patient messages.

### [Patient Portal:](https://lifecare-hospitals.netlify.app)
- **Registration and Login**: Patients can register and log in.
- **Appointment Booking**: Schedule appointments with doctors, including patient details and date.
- **Message Sending**: Send messages to the admin.
- **Hospital Information**: Learn about Life Care Hospital.

## Project Structure

The project is organized into the following main folders:

- **Backend**: Contains the server-side code for handling API requests, authentication, and database interactions.
- **Frontend-Admin**: The responsive frontend for hospital administrators.
- **Frontend-Patient**: The responsive frontend for patients.

### Backend
The backend is built using Node.js and Express, and it includes:
- **Dependencies**: `bcrypt`, `cloudinary`, `cookie-parser`, `cors`, `dotenv`, `express`, `express-fileupload`, `jsonwebtoken`, `mongoose`, `validator`.
- **Features**: Error handling, input validation, token generation, and user schemas.

### Frontend - Admin
The admin panel is built with React.js and provides a responsive interface for managing hospital operations.

### Frontend - Patient
The patient portal is also built with React.js, offering a responsive design for patient interactions.

## Technologies Used

- **Frontend**: React.js, Bootstrap, Axios
- **Backend**: Node.js, Express, PostgreSQL, JWT, Bcrypt
- **Other**: Cloudinary for image uploads, dotenv for environment variables, cookie-parser for handling cookies.

## Getting Started

To get started with the project, follow these instructions:

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.
- A running backend server (see the backend section for setup instructions).

### Installation

1. **Clone the repository:**

   ```bash
    git clone https://github.com/Fairooz2150/Hospital-Management-System.git
   ```
    - First open Hospital-Management-System folder:
     ```bash
     cd Hospital-Management-System
     ```

2. **Navigate to each folder and install dependencies:**

   - For Backend:
     ```bash
     cd Backend
     npm install
     ```

   - For Frontend-Admin:
     ```bash
     cd Frontend-Admin
     npm install
     ```

   - For Frontend-Patient:
     ```bash
     cd Frontend-Patient
     npm install
     ```

### Running the Application


1. **Start the Backend server:**

   ```bash
   cd Backend
   npm run dev
   ```

2. **Start the Frontend-Admin application:**

   ```bash
   cd Frontend-Admin
   npm run dev
   ```

3. **Start the Frontend-Patient application:**

   ```bash
   cd Frontend-Patient
   npm run dev
   ```

4. **Open your browser and navigate to:**
   - Admin Panel: [http://localhost:5174](http://localhost:5174)
   - Patient Portal: [http://localhost:5175](http://localhost:5175)

### Environment Variables

Ensure you have the following environment variables set in your `.env` file for the backend:

- `PORT`: The port number for the backend server
- `PGUSER`: PostgreSQL username
- `PGHOST`: PostgreSQL host (usually localhost)
- `PGDATABASE`: PostgreSQL database name (life_care_hospital)
- `PGPASSWORD`: PostgreSQL password
- `PGPORT`: PostgreSQL port (usually 5432)
- `JWT_SECRET_KEY`: Secret key for JWT
- `JWT_EXPIRES`: JWT expiration time
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image storage
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Creating an Admin User

1. **Register a new patient user** by following the registration process on the Patient Portal.
2. **Update the user's role** to "Admin" directly in the database:
   - Connect to your PostgreSQL database using psql or a GUI tool
   - Run the following SQL command:
     ```sql
     UPDATE users SET role = 'Admin' WHERE email = 'your_email@example.com';
     ```

### Contributing

If you'd like to contribute to the project:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.


