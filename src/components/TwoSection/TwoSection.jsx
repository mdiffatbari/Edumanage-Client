import React from 'react';
import call from "../../assets/call.jpg"

const TwoSection = () => {
    return (
        <div className='mx-auto'>
            {/*============== section one========= */}
            <div
                className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url(${call})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-6 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
                    <p className="mb-6 text-lg md:text-xl">
                        Join EduManage today and start your journey as a learner or educator. Empower your future with accessible, quality education.
                    </p>
                </div>
            </div>
            {/*============== section Two========= */}
            <div className='flex items-center justify-center py-20'>
                <div className="join join-vertical bg-base-100 w-6xl">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title font-semibold">How do I enroll in a course?</div>
                        <div className="collapse-content text-sm">
                            Browse our courses, click on the one you're interested in, and press the "Enroll Now" button to get started.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">Can I teach on EduManage?</div>
                        <div className="collapse-content text-sm">
                            Yes! Click on "Teach on EduManage" in the menu and follow the application process to become an instructor.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">Are the courses self-paced?</div>
                        <div className="collapse-content text-sm">
                            Most of our courses are self-paced, allowing you to learn at your convenience. Some live sessions may also be available.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">Will I get a certificate after completing a course?</div>
                        <div className="collapse-content text-sm">
                            Yes, learners receive a verified digital certificate upon successfully completing any certified course.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">How do I track my learning progress?</div>
                        <div className="collapse-content text-sm">
                            You can view your enrolled courses, progress, and achievements in your personal dashboard after logging in.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">Is there any support available if I face issues?</div>
                        <div className="collapse-content text-sm">
                            Absolutely! You can contact our support team through the "Help Center" or send us a message via the "Contact Us" page.
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default TwoSection;