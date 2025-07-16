import React from 'react';
import partner_a from "../../assets/company/company-a.png";
import partner_b from "../../assets/company/company-b.png";
import partner_c from "../../assets/company/company-h.png";
import partner_d from "../../assets/company/company-d.png";
import partner_e from "../../assets/company/company-g.png";
import partner_f from "../../assets/company/company-f.png";

const partners = [
    { logo: partner_a, name: "Hoya", description: "Collaborating on curriculum innovation and digital learning." },
    { logo: partner_b, name: "QNB", description: "Providing global outreach for international education programs." },
    { logo: partner_c, name: "mprese", description: "Enhancing skill-based training for our students." },
    { logo: partner_d, name: "wk education", description: "Supplying technology solutions to modernize learning." },
    { logo: partner_e, name: "TeachNet", description: "Partnering to support teachers through professional development." },
    { logo: partner_f, name: "ZEEKR", description: "Expanding open-access resources and education equity." }
];

const Partners = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00262b]">Our Trusted Partners</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We’re proud to collaborate with leading organizations and companies who help us expand access to quality education worldwide.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-start justify-center">
                {partners.map((partner, index) => (
                    <div key={index} className="text-center space-y-3">
                        <img src={partner.logo} alt={partner.name} className="h-16 mx-auto" />
                        <p className="text-sm font-semibold text-[#00262b]">{partner.name}</p>
                        <p className="text-xs text-gray-500">{partner.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
