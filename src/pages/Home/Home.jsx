import React from 'react';
import Banner from '../../components/Banner/Banner';
import Partners from '../../components/Partners/Partners';
import TeacherApply from '../../components/TeacherApply/TeacherApply';
import TwoSection from '../../components/TwoSection/TwoSection';
import PopularClasses from '../../components/PopularClasses/PopularClasses';
import TotalTrafic from '../../components/TotalTrafic/TotalTrafic';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <PopularClasses></PopularClasses>
            <TotalTrafic></TotalTrafic>
            <TeacherApply></TeacherApply>
            <TwoSection></TwoSection>
        </div>
    );
};

export default Home;