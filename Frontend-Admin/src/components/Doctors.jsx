import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import Loading from "./loading";
import { Navigate } from "react-router-dom";
import { authAPI } from "../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await authAPI.getDoctors();
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element, index) => {
              return (
                <div className="card" key={index}>
                  <img
                    src={element.doctor_avatar && element.doctor_avatar.url}
                    alt="Doctor Avatar"
                  />
                  <h4>{`${element.first_name} ${element.last_name}`}</h4>
                  <div className="details">
                    <p>
                      Email:<span>{element.email}</span>
                    </p>
                    <p>
                      Phone:<span>{element.phone}</span>
                    </p>
                    <p>
                      DoB:<span>{element.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department:<span>{element.doctor_department}</span>
                    </p>
                    <p>
                      Aadhar:<span>{element.aadhar}</span>
                    </p>
                    <p>
                      Gender:<span>{element.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctors Found!</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
