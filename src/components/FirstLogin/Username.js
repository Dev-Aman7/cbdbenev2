import React from 'react';
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
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LightTooltip from '../Atoms/LightTooltip';
import InfoIcon from '../Atoms/Icons/InfoIcon';

import * as actionCreators from '../../store/actions/firstLogin';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Username(props) {
    const classes = useStyles();
    // const [gender, setGender] = React.useState('');

    // const handleChange = (event) => {
    //     setGender(event.target.value);
    // };

    const usernameRules = (
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
        <Box>
            <Typography>We are excited to have you on board!</Typography>
            <Typography>
                Before we begin, let us know how you want others to identify you
            </Typography>
            <form>
                <Grid container>
                    <Grid item md={4} xs={12}>
                        <FormControl
                            fullWidth
                            size='small'
                            variant='outlined'
                            margin='normal'
                        >
                            <InputLabel
                                // className={classes.formFields}
                                htmlFor='Username'
                            >
                                Username
                            </InputLabel>
                            <OutlinedInput
                                size='small'
                                id='username'
                                // classes={{ input: classes.formFields }}
                                value={props.username}
                                onChange={(e) =>
                                    props.update('username', e.target.value)
                                }
                                label='Username'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <LightTooltip title={usernameRules}>
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
                </Grid>
            </form>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    username: state.first.username,
});

const mapDispatchToProps = {
    update: (name, value) => actionCreators.update(name, value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Username);
