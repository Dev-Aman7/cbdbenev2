import React, { useEffect, useState } from 'react';

import {
    Box,
    AppBar,
    Tabs,
    Tab,
    Container,
    Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AuthLayout from '../../components/Layouts/AuthLayout';
import SignInForm from '../../components/Forms/SignInForm';
import SignUpForm from '../../components/Forms/SignUpForm';

import WelcomeText from '../../images/Welcome-text.svg';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(0, 9),
    },
    tab: {
        textTransform: 'none',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`auth-type-tabpanel-${index}`}
            aria-labelledby={`auth-type-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function TabTitle(title) {
    return <Typography variant='h6'>{title}</Typography>;
}

function a11yProps(index) {
    return {
        id: `auth-type-tab-${index}`,
        'aria-controls': `auth-type-tabpanel-${index}`,
    };
}

export default function SignIn(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (props.location.pathname.includes('signUp')) {
            setValue(1);
        }
    }, [props.location.pathname]);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            props.history.push('/auth/signIn');
            setValue(0);
        } else {
            props.history.push('/auth/signUp');
            setValue(1);
        }
    };

    return (
        <AuthLayout bannerImg={WelcomeText}>
            <Container maxWidth='xs' className={classes.container}>
                <AppBar position='static' color='transparent' elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='inherit'
                        centered
                        variant='fullWidth'
                        aria-label='auth-type-tabs'
                    >
                        <Tab
                            className={classes.tab}
                            label={TabTitle('Log In')}
                            {...a11yProps(0)}
                        />
                        <Tab
                            className={classes.tab}
                            label={TabTitle('Sign Up')}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <SignInForm />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <SignUpForm />
                </TabPanel>
            </Container>
        </AuthLayout>
    );
}
