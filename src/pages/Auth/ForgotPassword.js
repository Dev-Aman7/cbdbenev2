import React, { useState } from 'react';

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
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import ForgotPasswordSuccess from '../../components/Messages/ForgotPasswordSuccess';
import WelcomeText from '../../images/Welcome-text.svg';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(0, 9),
    },
    tab: {
        textTransform: 'none',
        cursor: 'text',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`reset-password-tabpanel-${index}`}
            aria-labelledby={`reset-password-tab-${index}`}
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
        id: `reset-password-tab-${index}`,
        'aria-controls': `reset-password-tabpanel-${index}`,
    };
}

export default function ResetPassword() {
    const classes = useStyles();
    const theme = useTheme();

    const tabIndex = 0;

    const [resetStatus, setResetStatus] = useState(null);
    const [userIdData, setUserIdData] = useState('');

    const resetPassword = (error, userData) => {
        // make api call
        if (!error) {
            setResetStatus('success');
            setUserIdData(userData);
            console.log('user-id-data', resetStatus);
        } else {
            setResetStatus(`error${new Date().getMilliseconds()}`);
            setUserIdData('');
            console.log('user-id-data', resetStatus);
        }
    };

    return (
        <AuthLayout bannerImg={WelcomeText}>
            <Container maxWidth='xs' className={classes.container}>
                <AppBar position='static' color='transparent' elevation={0}>
                    <Tabs
                        value={tabIndex}
                        indicatorColor='primary'
                        textColor='inherit'
                        variant='fullWidth'
                        aria-label='reset-password-tabs'
                    >
                        <Tab
                            className={classes.tab}
                            disableFocusRipple
                            disableRipple
                            label={TabTitle('Forgot password')}
                            {...a11yProps(0)}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                    {resetStatus === 'success' ? (
                        <ForgotPasswordSuccess emailAddress={userIdData} />
                    ) : (
                        <ForgotPasswordForm
                            resetPassword={resetPassword}
                            error={resetStatus}
                        />
                    )}
                </TabPanel>
            </Container>
        </AuthLayout>
    );
}
