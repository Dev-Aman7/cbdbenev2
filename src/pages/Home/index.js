import React from 'react';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
    return <Redirect to='/auth' />;
};

export default HomePage;
