import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const slides = [
    {
        image: "/images/banner-a.jpg",
        title: "Unlock Your Potential",
        subtitle: "Join thousands of learners building brighter futures through quality education."
    },
    {
        image: "/images/banner-b.jpg",
        title: "Flexible Learning for Everyone",
        subtitle: "Access courses anytime, anywhere — on your own schedule."
    },
    {
        image: "/images/banner-c.jpg",
        title: "Teach and Inspire",
        subtitle: "Share your knowledge and shape the next generation of thinkers and creators."
    }
];


const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mx-auto overflow-hidden shadow-xl">
            <div className="relative h-[70vh]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${current === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="w-full h-full bg-black opacity-70 flex flex-col justify-center items-center text-center px-6 md:px-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                            <p className="text-lg md:text-xl text-white max-w-2xl pb-5">{slide.subtitle}</p>
                            <Link
                                to="/all-classes"
                                className="bg-[#cb3f02] text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#cb3f02] transition"
                            >
                                See More
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Dot Indicators */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-3 w-3 rounded-full ${current === index ? 'bg-[#cb3f02]' : 'bg-white opacity-50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
