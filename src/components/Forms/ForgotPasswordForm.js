import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Link,
    OutlinedInput,
    InputLabel,
    FormControl,
    Typography,
} from '@material-ui/core';

import Button from '../Atoms/Button';
import Alert from '../Atoms/Alert';
import HrText from '../Atoms/HrText';
import useAuthFormsStyles from '../../styles/AuthForms';
import * as actionCreators from '../../store/actions';

function ForgotPasswordForm(props) {
    const classes = useAuthFormsStyles();

    const [userIdData, setUserIdData] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        props
            .forgot({ email: userIdData })
            .then((data) => {
                console.log(data);
                props.resetPassword(false, userIdData);
                console.log('forgot pwd', data);
                // setLoading(false);
            })
            .catch((err) => {
                props.resetPassword(true, userIdData);
                console.log('forgot pwd err', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        setOpenAlert(props.error !== null && props.error.includes('error'));
        return () => {
            setUserIdData('');
            setOpenAlert(false);
        };
    }, [props.error]);

    return (
        <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.input}
                            fullWidth
                            size='small'
                            variant='outlined'
                        >
                            <InputLabel htmlFor='user-id-data'>
                                Email or username
                            </InputLabel>
                            <OutlinedInput
                                id='user-id-data'
                                value={userIdData}
                                onChange={(e) => setUserIdData(e.target.value)}
                                label='Email or username'
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            label='Send reset link'
                            loading={loading}
                            onClick={handleSubmit}
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

            <Alert
                message='Something went wrong'
                open={openAlert}
                onClose={handleClose}
                severity='error'
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgot: (payload) => dispatch(actionCreators.forgot(payload)),
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordForm);
