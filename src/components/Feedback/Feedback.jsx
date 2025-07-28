import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/teaching-evaluations')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error('Error fetching feedback:', err));
  }, []);

  // Set card width based on window size (for scroll amount)
  useEffect(() => {
    function updateCardWidth() {
      if (window.innerWidth >= 1024) {
        // 3 cards visible: width = container / 3 - gap
        const containerWidth = carouselRef.current?.offsetWidth || 0;
        setCardWidth(containerWidth / 3 - 16); // 16px gap approx
      } else {
        // 1 card visible
        const containerWidth = carouselRef.current?.offsetWidth || 0;
        setCardWidth(containerWidth);
      }
    }
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Auto scroll every 4 seconds
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    const totalScrollWidth = scrollContainer.scrollWidth;
    const maxScrollLeft = totalScrollWidth - scrollContainer.clientWidth;

    let scrollPosition = 0;

    const interval = setInterval(() => {
      scrollPosition += cardWidth + 16; // card width + gap
      if (scrollPosition > maxScrollLeft) {
        scrollPosition = 0; // loop back
      }
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cardWidth, feedbacks.length]);

  return (
    <div className="bg-[#00262b] py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ height: '300px' }} // fixed height (adjust as needed)
        >
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="snap-center flex-shrink-0 bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center"
              style={{
                width: window.innerWidth >= 1024 ? 'calc((100% / 3) - 16px)' : '100%',
                minHeight: '200px', // fix minimum height for all cards
                maxHeight: '100%', // allow growing for big text
              }}
            >
              <div className="flex justify-center items-center mb-4">
                <FaUserCircle size={50} className="text-gray-500" />
              </div>
              <p className="font-bold text-xl mb-1">{fb.name}</p>
              <p className="text-gray-500 mb-3 italic">{fb.classTitle}</p>
              <p className="text-gray-700 text-sm overflow-auto">{fb.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
