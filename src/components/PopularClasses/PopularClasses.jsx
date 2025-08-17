import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/classes')
      .then(res => {
        const sorted = res.data
          .sort((a, b) => b.enrolled - a.enrolled)
          .slice(0, 6);
        setClasses(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch classes:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  });

  const scrollNext = () => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleEnroll = (id) => {
    navigate(`/class/${id}`);
  };

  if (loading) {
    return <p className="text-center py-10">Loading popular classes...</p>;
  }

  return (
    <div className='bg-base-200'>
      <div className="max-w-7xl mx-auto py-14 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Classes</h2>

        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar p-9"
          >
            {classes.map(cls => (
              <div
                key={cls._id}
                className="flex-shrink-0 w-full sm:w-[80%] md:w-[50%] lg:w-[33.333%] bg-white shadow-xl rounded-xl overflow-hidden flex flex-col"
              >
                <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{cls.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">Instructor: {cls.name}</p>
                  <p className="text-sm">Enrolled: {cls.enrolled}</p>
                  <p className="text-sm font-bold mb-3">€{cls.price}</p>
                  <button
                    className="btn btn-sm bg-[#cb3f02] text-white w-full mt-auto"
                    onClick={() => handleEnroll(cls._id)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            ❮
          </button>
          <button
            onClick={scrollNext}
            className="btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularClasses;
