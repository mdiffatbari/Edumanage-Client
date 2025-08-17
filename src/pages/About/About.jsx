import React from "react";
import abotJpg from '../../assets/about.jpg'

const About = () => {
  return (
    <div className="w-full bg-gray-50 py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={abotJpg}
            alt="Edumanage Learning"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right: Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About <span className="text-[#cb3f02]">Edumanage</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Edumanage is a modern online learning platform designed to connect 
            students and teachers in a seamless digital environment. Our mission 
            is to empower learners with engaging classes, interactive assignments, 
            and real-time progress tracking.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With role-based dashboards for students, teachers, and admins, 
            Edumanage ensures an efficient, structured, and collaborative 
            learning experience. Whether you're managing classes, creating 
            assignments, or enrolling in new courses, Edumanage makes 
            education simple and effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
