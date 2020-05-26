import React from 'react';

import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const Item = (props) => {
    const { label } = props;
    return (
        <Card>
            <CardContent>
                <Typography>{label}</Typography>
            </CardContent>
        </Card>
    );
};

const ExperienceLevel = () => {
    return (
        <Carousel breakPoints={breakPoints}>
            <Item label='Beginner' />
            <Item label='Intermediate' />
            <Item label='Expert' />
        </Carousel>
    );
};

export default ExperienceLevel;
