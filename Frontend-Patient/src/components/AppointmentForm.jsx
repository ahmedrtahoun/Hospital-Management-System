import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { appointmentAPI, doctorAPI } from "../services/api";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

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

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await doctorAPI.getAll();
        console.log('All doctors:', data.doctors);
        setDoctors(data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to fetch doctors. Please try again later.');
      }
    };
    fetchDoctors();
  }, []);

  const getRandomDoctor = (department) => {
    const departmentDoctors = doctors.filter(doctor => doctor.doctor_department === department);
    if (departmentDoctors.length === 0) {
      throw new Error(`No doctors available in ${department} department`);
    }
    const randomIndex = Math.floor(Math.random() * departmentDoctors.length);
    return departmentDoctors[randomIndex];
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      // Get a random doctor from the selected department
      const selectedDoctor = getRandomDoctor(department);
      if (!selectedDoctor) {
        toast.error(`No doctors available in ${department} department`);
        return;
      }

      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await appointmentAPI.create({
          firstName,
          lastName,
          email,
          phone,
          aadhar,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: selectedDoctor.first_name,
          doctor_lastName: selectedDoctor.last_name,
          hasVisited: hasVisitedBool,
          address,
      });
      
      toast.success(`${data.message} You have been assigned to Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name}`);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadhar("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      console.error('Error creating appointment:', error);
      if (error.message.includes('No doctors available')) {
        toast.error(error.message);
      } else {
        toast.error(error.response?.data?.message || "Failed to create appointment. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Aadhar Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div>
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
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="full-width"
            >
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px"}}
            />
          </div>
          <button type="submit">Get Appointment</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
