import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Link } from '@material-ui/core';

function ForgotPasswordSuccessMessage({ emailAddress }) {
    return (
        <Grid container>
            <Typography>
                Instructions to reset password have been mailed to you at&nbsp;
                <Link href={emailAddress}>{emailAddress}</Link>&nbsp;, you can
                now close this tab and continue. If you haven’t received an
                email, click resend.
            </Typography>
        </Grid>
    );
}

ForgotPasswordSuccessMessage.propTypes = {
    emailAddress: PropTypes.string.isRequired,
};

export default ForgotPasswordSuccessMessage;
