import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const departmentsData = [
  {
    name: "Cardiology",
    description: "Expert heart care with advanced diagnostics and treatments.",
    image: "/departments/cardiology.jpg"
  },
  {
    name: "Neurology",
    description: "Comprehensive care for neurological conditions and disorders.",
    image: "/departments/neurology.jpg"
  },
  {
    name: "Orthopedics",
    description: "Specialized care for bones, joints, and musculoskeletal issues.",
    image: "/departments/orthopedics.jpg"
  },
  {
    name: "Pediatrics",
    description: "Dedicated healthcare for infants, children, and adolescents.",
    image: "/departments/pediatrics.jpg"
  },
  {
    name: "Oncology",
    description: "Advanced cancer treatment and comprehensive care.",
    image: "/departments/oncology.jpg"
  }
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Departments = () => {
  return (
    <div className="departments container">
      <h2>Our Departments</h2>
      <p className="departments-intro">
        Explore our specialized departments offering comprehensive healthcare
        services with state-of-the-art facilities and expert medical professionals.
      </p>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {departmentsData.map((department, index) => (
          <div key={index} className="department-card">
            <div className="department-content">
              <div className="department-name">
                <h3>{department.name}</h3>
              </div>
              {department.image ? (
                <img src={department.image} alt={department.name} />
              ) : (
                <div className="image-fallback">Image not available</div>
              )}
              <div className="department-description">
                <p>{department.description}</p>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
