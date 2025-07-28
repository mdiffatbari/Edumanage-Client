import React from 'react';
import teacherImg from "../../assets/teacher.jpg";
import { Link } from 'react-router';

const TeacherApply = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

                <div className="w-full lg:w-1/2">
                    <img src={teacherImg} alt="Teach with us" className="rounded-lg shadow-lg w-full object-cover" />
                </div>


                <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#00262b]">
                        Share Your Knowledge, Inspire the World
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join EduManage and become a part of a global community of educators. Empower students, create your own courses, and make a lasting impact—right from your screen.
                    </p>
                    <Link to="/teach-on">
                        <button className="btn bg-[#cb3f02] text-white px-6 rounded-full">
                            Apply to Teach
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeacherApply;
