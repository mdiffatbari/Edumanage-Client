import React from 'react';
import Banner from '../../components/Banner/Banner';
import Partners from '../../components/Partners/Partners';
import TeacherApply from '../../components/TeacherApply/TeacherApply';
import TwoSection from '../../components/TwoSection/TwoSection';
import PopularClasses from '../../components/PopularClasses/PopularClasses';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <PopularClasses></PopularClasses>
            <TeacherApply></TeacherApply>
            <TwoSection></TwoSection>
        </div>
    );
};

export default Home;