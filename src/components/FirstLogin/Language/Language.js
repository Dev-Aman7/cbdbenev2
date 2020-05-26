import React from 'react';
import Carousel from 'react-elastic-carousel';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './Language.scss';

import Python from '../../../images/python.png';
import JS from '../../../images/js.png';
import Java from '../../../images/java.png';
import Cpp from '../../../images/cpp.png';
import C from '../../../images/c.png';

const images = [Python, JS, Java, Cpp, C];
const text = ['Python', 'JS', 'Java', 'C++', 'C'];

const useStyles = makeStyles(() => ({
    slider: {
        marginTop: '2rem',
        backgroundColor: 'white',
        height: '10rem',
    },
    card: {
        width: '6rem',
        backgroundColor: 'white',
        padding: '1rem',
        textAlign: 'center',
        margin: '1rem',
    },
    card_wrapper: {
        display: 'flex',
    },
    container: {
        margin: '1rem',
    },
    heading: {
        marginLeft: '2rem',
        marginTop: '3rem',
        fontWeight: '600',
    },
    subHeading: {
        marginLeft: '2rem',
        marginTop: '2rem',
        maxWidth: '35rem',
    },
}));
export default function Language(props) {
    const classes = useStyles();
    const languages = images.map((elem, index) => {
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia>
                        <img src={elem} alt='python' />
                    </CardMedia>
                    <CardContent>
                        <Typography>{text[index]}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    });
    const btn = <div>Hello</div>;
    return (
        // <div className={classes.container}>
        <Grid container direction='column'>
            <Grid item>
                <Typography variant='h4' className={classes.heading}>
                    Lets get technical!
                </Typography>
                <Typography variant='subtitle1' className={classes.subHeading}>
                    Select the language you are comfortable with or the language
                    youd like to learn.
                </Typography>
            </Grid>
            <Grid item>
                <Carousel
                    // cssModule={AwesomeSliderStyles}
                    className={classes.slider}
                    bullets={false}
                    organicArrows={false}
                    buttonContentRight={btn}
                    // style={{ backgroundColor: 'white' }}
                >
                    <div>{languages}</div>
                    <div>{languages}</div>
                    <div>{languages}</div>
                </Carousel>
                <Button
                    onClick={() => props.selectHandler('language', 'CPP')}
                />
            </Grid>
        </Grid>
        // </div>
    );
}
