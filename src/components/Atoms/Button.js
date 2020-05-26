import React from 'react';
import {
    Button as MuiButton,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    btn: {
        height: theme.spacing(5),
        padding: theme.spacing(1, 1),
        textTransform: 'none',
        fontWeight: 'bold',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    btnLabel: {
        fontSize: '14px',
        fontWeight: '600',
    },
}));

export default function Button({
    children,
    label,
    loading,
    className,
    ...rest
}) {
    const classes = useStyles();

    return (
        <MuiButton
            fullWidth
            disableElevation
            variant='contained'
            color='primary'
            disabled={loading}
            {...rest}
            className={classes.btn}
        >
            {loading ? (
                <CircularProgress size='1.4rem' />
            ) : (
                <Typography className={classes.btnLabel}>{label}</Typography>
            )}
        </MuiButton>
    );
}
