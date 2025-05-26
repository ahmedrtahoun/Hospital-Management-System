import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    aadhar,
    dob,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !aadhar ||
    !dob ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new ErrorHandler("User already registered with this email!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    role,
  });

  const token = User.generateToken(user.id);
  res.status(200).cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  }).json({
    success: true,
    message: "User Registered Successfully",
    user
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all details!", 400));
  }

  const user = await User.findByEmail(email);
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await User.comparePassword(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }

  const token = User.generateToken(user.id);

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
    secure: false, // Set to false for local development
    sameSite: 'lax',
    path: '/'
  };

  // Log cookie setting
  console.log('Setting cookie with options:', cookieOptions);
  console.log('Token:', token);
  
  res.cookie('token', token, cookieOptions)
     .status(200)
     .json({
        success: true,
        message: "Login Successful",
        user,
        token
     });
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, aadhar, dob } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !aadhar ||
    !dob
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new ErrorHandler(`${existingUser.role} already exists with this email!`, 400));
  }

  await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    aadhar,
    dob,
    role: "Admin"
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!"
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.getAllDoctors();
  res.status(200).json({
    success: true,
    doctors
  });
});

export const getAllPatients = catchAsyncErrors(async (req, res, next) => {
  const patients = await User.getAllPatients();
  res.status(200).json({
    success: true,
    patients
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("token", "", {
      expires: new Date(Date.now()),
    httpOnly: true
  }).json({
      success: true,
    message: "Logged Out Successfully!"
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    aadhar,
    dob,
    doctor_department
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !aadhar || !dob || !doctor_department) {
    return next(new ErrorHandler("Please provide full details", 400));
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new ErrorHandler(`${existingUser.role} already registered with this email!`, 400));
  }

  let doctorData = {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    aadhar,
    dob,
    role: "Doctor",
    doctor_department
  };

  // Handle avatar upload if provided
  if (req.files && req.files.doctorAvatar) {
    const { doctorAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(doctorAvatar.mimetype)) {
      return next(new ErrorHandler("Invalid file format!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(doctorAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
      return next(new ErrorHandler("Error uploading avatar", 500));
    }

    doctorData.doctorAvatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    };
  }

  const doctor = await User.create(doctorData);

  res.status(200).json({
    success: true,
    message: "New Doctor Registered!",
    doctor
  });
});
