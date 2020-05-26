import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

const Alert = (props) => {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={3000}
            onClose={props.onClose}
        >
            <MuiAlert onClose={props.onClose} severity={props.severity}>
                {props.message}
            </MuiAlert>
        </Snackbar>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success'])
        .isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Alert;
