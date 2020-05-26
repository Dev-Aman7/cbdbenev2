import 'date-fns';
import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../Atoms/Button';

import * as actionCreators from '../../store/actions/firstLogin';

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2.5),
    },
    heading: {
        marginBottom: theme.spacing(5),
    },
    subitem: {
        marginRight: theme.spacing(1),
    },
}));

function Birthdate(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(
        new Date('2014-08-18T21:11:54')
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
        props.update('birthdate', date);
    };
    const classes = useStyles();
    return (
        <Box>
            <Typography variant='h4' className={classes.heading}>
                Hello, User
            </Typography>
            <Typography variant='subtitle2'>
                To continue, you must be older than 13 years.
            </Typography>
            <Grid container className={classes.item}>
                <Grid item md={4} xs={12} className={classes.subitem}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            inputVariant='outlined'
                            format='dd/mm/yyyy'
                            id='date-picker-inline'
                            label='Date picker inline'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            placeholder='dd/mm/yyyy'
                            size='small'
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={4} xs={12} className={classes.subitem}>
                    <FormControl
                        variant='outlined'
                        fullWidth
                        size='small'
                        // className={classes.formControl}
                    >
                        <InputLabel>Gender</InputLabel>
                        <Select
                            labelId='gender'
                            id='gender'
                            value={props.gender}
                            onChange={(e) =>
                                props.update('gender', e.target.value)
                            }
                            label='gender'
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                            <MenuItem value='Other'>Other</MenuItem>
                            <MenuItem value='Rather not to say'>
                                Rather not to say
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    birthdate: state.first.birthdate,
    gender: state.first.gender,
});

const mapDispatchToProps = {
    update: (name, value) => actionCreators.update(name, value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Birthdate);
