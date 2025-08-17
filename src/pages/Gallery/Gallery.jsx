import React from 'react';
import image1 from "../../assets/gallery/i1 (1).jpg";
import image2 from "../../assets/gallery/i1 (2).jpg";
import image3 from "../../assets/gallery/i1 (3).jpg";
import image4 from "../../assets/gallery/i1 (4).jpg";
import image5 from "../../assets/gallery/i1 (5).jpg";
import image6 from "../../assets/gallery/i1 (6).jpg";
import image7 from "../../assets/gallery/i1 (7).jpg";

const Gallery = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <section className="bg-gray-50 py-32">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#cb3f02" }}>
          Our Gallery
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
