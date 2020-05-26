import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const SingleBanner = ({ content }) => {
    return (
        <Grid item xs={12}>
            <Typography>{content}</Typography>
        </Grid>
    );
};

SingleBanner.propTypes = {
    content: PropTypes.element.isRequired,
};

export default SingleBanner;
