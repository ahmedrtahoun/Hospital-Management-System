import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";
import { toast } from "react-toastify";
import api from "../services/api";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctrDptmnt, setDoctrDptmnt] = useState("");
  const [doctrAvatar, setDoctrAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setDoctrAvatar(file);
      };
    } else {
      setAvatarPreview("");
      setDoctrAvatar("");
    }
  };

  const addNewDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("aadhar", aadhar);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("doctor_department", doctrDptmnt);
      formData.append("password", password);
      if (doctrAvatar) {
        formData.append("doctorAvatar", doctrAvatar);
      }

      const response = await api.post("/user/admin/add-doctor", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      toast.success(response.data.message);
      navigateTo("/doctors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page">
        <div className="container form-component add-doctor-form">
          <img src="/logo.png" alt="Life Care" className="logo" />
          <h1 className="form-title">Register a new Doctor</h1>

          <form onSubmit={addNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={avatarPreview ? `${avatarPreview}` : "/docHolder.jpg"}
                  alt="Doctor Avatar"
                />
                <input 
                  type="file" 
                  onChange={handleAvatar} 
                  accept="image/*"
                  title="Upload doctor's profile picture (optional)"
                />
                <p className="avatar-note">Profile picture is optional</p>
              </div>

              <div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={phone}
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <input
                  type="number"
                  value={aadhar}
                  placeholder="Aadhar Number"
                  onChange={(e) => setAadhar(e.target.value)}
                  required
                />
                <input
                  type="date"
                  value={dob}
                  placeholder="Date of Birth"
                  onChange={(e) => setDob(e.target.value)}
                  required
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>

                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <select
                  value={doctrDptmnt}
                  onChange={(e) => setDoctrDptmnt(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </select>
                <button type="submit">Register New Doctor</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewDoctor;
