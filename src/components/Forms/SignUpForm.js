import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    IconButton,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';

import Button from '../Atoms/Button';
import HrText from '../Atoms/HrText';
import LightTooltip from '../Atoms/LightTooltip';
import useAuthFormsStyles from '../../styles/AuthForms';
import GoogleBtn from '../SocialButtons/GoogleBtn';
import GithubBtn from '../SocialButtons/GithubBtn';
import FacebookBtn from '../SocialButtons/FacebookBtn';
import EyeIcon from '../Atoms/Icons/EyeIcon';
import EyeOffIcon from '../Atoms/Icons/EyeOffIcon';
import InfoIcon from '../Atoms/Icons/InfoIcon';
import * as actionCreators from '../../store/actions';

function SignUpForm(props) {
    const classes = useAuthFormsStyles();
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cpassword: '',
        referralCode: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const {
            email,
            firstName,
            lastName,
            password,
            cpassword,
            referralCode,
        } = values;
        const payload = {
            email,
            firstName,
            lastName,
            password,
            cpassword,
            referralCode,
        };
        console.log('SignUp', payload);
        setValues({ ...values, loading: true });
        props
            .signUp(payload)
            .then((data) => {
                console.log('signup-form', data);
                props.history.push('/auth/signIn');
                setValues({ ...values, loading: false });
            })
            .catch((err) => {
                console.log('signup-form', err);
                setValues({ ...values, loading: false });
            });
    };

    const passwordRules = (
        <>
            <Typography variant='body2' color='inherit'>
                Password should have:
            </Typography>
            <Typography variant='body2' color='inherit'>
                - atleast 1 capital letter
            </Typography>
            <Typography variant='body2' color='inherit'>
                - atleast 1 small letter
            </Typography>
            <Typography variant='body2' color='inherit'>
                - alteast 8 characters long
            </Typography>
        </>
    );

    return (
        <div className={classes.paper}>
            <Grid container justify='space-around'>
                <Grid item>
                    <FacebookBtn />
                </Grid>

                <Grid item>
                    <GoogleBtn />
                </Grid>

                <Grid item>
                    <GithubBtn />
                </Grid>
            </Grid>

            <HrText text='or sign up with' size={5} />

            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <FormControl
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                >
                                    <InputLabel
                                        className={classes.formFields}
                                        htmlFor='firstName'
                                    >
                                        First Name
                                    </InputLabel>
                                    <OutlinedInput
                                        id='firstName'
                                        classes={{ input: classes.formFields }}
                                        value={values.firstName}
                                        onChange={handleChange('firstName')}
                                        label='First Name'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                >
                                    <InputLabel
                                        className={classes.formFields}
                                        htmlFor='lastName'
                                    >
                                        Last Name
                                    </InputLabel>
                                    <OutlinedInput
                                        id='lastName'
                                        classes={{ input: classes.formFields }}
                                        value={values.lastName}
                                        onChange={handleChange('lastName')}
                                        label='Last Name'
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel
                                className={classes.formFields}
                                htmlFor='email'
                            >
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id='email'
                                classes={{ input: classes.formFields }}
                                value={values.email}
                                onChange={handleChange('email')}
                                label='Email'
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel
                                className={classes.formFields}
                                htmlFor='password'
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id='password'
                                classes={{ input: classes.formFields }}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                label='Password'
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <LightTooltip title={passwordRules}>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                size='small'
                                                edge='end'
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </LightTooltip>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel
                                className={classes.formFields}
                                htmlFor='cpassword'
                            >
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id='cpassword'
                                classes={{ input: classes.formFields }}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.cpassword}
                                label='Confirm Password'
                                onChange={handleChange('cpassword')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            edge='end'
                                            size='small'
                                        >
                                            {values.showPassword ? (
                                                <EyeIcon />
                                            ) : (
                                                <EyeOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel
                                className={classes.formFields}
                                htmlFor='referralCode'
                            >
                                Referral Code (Optional)
                            </InputLabel>
                            <OutlinedInput
                                id='referralCode'
                                classes={{ input: classes.formFields }}
                                value={values.referralCode}
                                onChange={handleChange('referralCode')}
                                label='Referral Code (Optional)'
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            label='Sign Up'
                            loading={values.loading}
                            onClick={submitHandler}
                        />
                    </Grid>
                </Grid>
            </form>

            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} className={classes.paddedCenterBox}>
                    <Typography className={classes.textLight}>
                        By signing up, you agree to our&nbsp;
                        <Link href='/nowhere'>terms of service</Link>
                        &nbsp;and&nbsp;
                        <Link href='/nowhere'>privacy policy</Link>.
                    </Typography>
                    <Typography className={classes.textLight}>
                        This site is protected by reCAPTCHA and the Google&nbsp;
                        <Link href='/nowhere'>Privacy Policy</Link>
                        &nbsp;and&nbsp;
                        <Link href='/nowhere'>Terms of Service</Link>
                        &nbsp;apply.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (payload) => dispatch(actionCreators.signUp(payload)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm));
