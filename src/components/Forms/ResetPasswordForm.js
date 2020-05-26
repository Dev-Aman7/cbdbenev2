import React from 'react';
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
    Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import Button from '../Atoms/Button';
import HrText from '../Atoms/HrText';
import useAuthFormsStyles from '../../styles/AuthForms';
import * as actionCreators from '../../store/actions';

function ResetPasswordForm(props) {
    const classes = useAuthFormsStyles();

    const [values, setValues] = React.useState({
        password: '',
        cpassword: '',
        loading: false,
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        props
            .reset(
                {
                    password: values.password,
                    confirmPassword: values.cpassword,
                },
                props.token
            )
            .then(() => {
                props.history.push('/auth/signIn');
            });
    };

    return (
        <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.input}
                            fullWidth
                            size='small'
                            variant='outlined'
                        >
                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <OutlinedInput
                                id='password'
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
                                                <Visibility fontSize='small' />
                                            ) : (
                                                <VisibilityOff fontSize='small' />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl
                            className={classes.input}
                            fullWidth
                            size='small'
                            variant='outlined'
                        >
                            <InputLabel htmlFor='cpassword'>
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id='cpassword'
                                type={
                                    values.showConfirmPassword
                                        ? 'text'
                                        : 'password'
                                }
                                value={values.cpassword}
                                label='Confirm Password'
                                onChange={handleChange('cpassword')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            edge='end'
                                        >
                                            {values.showConfirmPassword ? (
                                                <Visibility fontSize='small' />
                                            ) : (
                                                <VisibilityOff fontSize='small' />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            label='Reset password'
                            loading={values.loading}
                            onClick={submitHandler}
                        />
                    </Grid>
                </Grid>
            </form>

            <HrText text='OR' size={2} />

            <Grid container direction='column' spacing={2} alignItems='center'>
                <Grid item>
                    <Link href='/auth/signUp'>Create an account</Link>
                </Grid>

                <Grid item>
                    <Typography>
                        Back to <Link href='/auth'>Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: (payload, token) =>
            dispatch(actionCreators.reset(payload, token)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(ResetPasswordForm));
