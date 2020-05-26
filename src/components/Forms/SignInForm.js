import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Grid,
    Link,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    IconButton,
} from '@material-ui/core';

import Button from '../Atoms/Button';
import HrText from '../Atoms/HrText';
import EyeIcon from '../Atoms/Icons/EyeIcon';
import EyeOffIcon from '../Atoms/Icons/EyeOffIcon';
import GoogleBtn from '../SocialButtons/GoogleBtn';
import GithubBtn from '../SocialButtons/GithubBtn';
import FacebookBtn from '../SocialButtons/FacebookBtn';
import useAuthFormsStyles from '../../styles/AuthForms';
import * as actionCreators from '../../store/actions';

function SignInForm(props) {
    const classes = useAuthFormsStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        loading: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setValues({ ...values, loading: true });
        const { email, password } = values;
        console.log('SignIn', { email, password });
        props
            .signIn({ email, password })
            .then((data) => {
                console.log('signin-form', data);
                props.history.push('/dash');
                // setValues({ ...values, loading: false });
            })
            .catch((err) => {
                console.log('signin-form', err);
                setValues({ ...values, loading: false });
            });
    };

    const googleHandler = (response) => {
        console.log('In signin ', response);
        props.google(response);
    };

    return (
        <div className={classes.paper}>
            <Grid container justify='space-around'>
                <Grid item>
                    <FacebookBtn />
                </Grid>

                <Grid item>
                    <GoogleBtn googleHandler={googleHandler} />
                </Grid>

                <Grid item>
                    <GithubBtn />
                </Grid>
            </Grid>

            <HrText text='or login with' size={4} />

            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined' size='small'>
                            <InputLabel
                                htmlFor='signin-email'
                                className={classes.formFields}
                            >
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id='signin-email'
                                classes={{ input: classes.formFields }}
                                value={values.email}
                                onChange={handleChange('email')}
                                label='Email'
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined' size='small'>
                            <InputLabel
                                htmlFor='signin-password'
                                className={classes.formFields}
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id='signin-password'
                                classes={{ input: classes.formFields }}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                label='Password'
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            edge='end'
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
                        <Grid container justify='flex-end'>
                            <Link
                                href='/auth/forgotPassword'
                                variant='subtitle2'
                                style={{ fontSize: 12, lineHeight: '10px' }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            label='Log In'
                            loading={values.loading}
                            onClick={submitHandler}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (payload) => dispatch(actionCreators.signIn(payload)),
        google: (payload) => dispatch(actionCreators.google(payload)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(SignInForm));
