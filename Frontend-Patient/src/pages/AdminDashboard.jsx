import React, { useEffect, useState } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await authAPI.getAllPatients();
        setPatients(data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast.error('Failed to fetch patients');
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="container form-component">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <Link to="/admin/doctors" className="add-doctor-btn">
          Manage Doctors
        </Link>
      </div>
      
      <h3>Registered Patients</h3>
      <div className="patients-list">
        {patients.length === 0 ? (
          <p>No patients registered yet.</p>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Aadhar</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{`${patient.first_name} ${patient.last_name}`}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.gender}</td>
                  <td>{new Date(patient.dob).toLocaleDateString()}</td>
                  <td>{patient.aadhar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 