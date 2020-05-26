import React from 'react';
import Proptypes from 'prop-types';
import { Grid, Divider, Typography } from '@material-ui/core';

import useAuthFormsStyles from '../../styles/AuthForms';

const HrText = (props) => {
    const { text, size } = props;
    const classes = useAuthFormsStyles();

    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className={classes.hrContainer}
        >
            <Grid item xs>
                <Divider
                    component='hr'
                    orientation='horizontal'
                    className={classes.hrStyles}
                />
            </Grid>

            <Grid item xs={size}>
                <Typography className={classes.hrText}>{text}</Typography>
            </Grid>

            <Grid item xs>
                <Divider
                    component='hr'
                    orientation='horizontal'
                    className={classes.hrStyles}
                />
            </Grid>
        </Grid>
    );
};

HrText.propTypes = {
    text: Proptypes.string.isRequired,
    size: Proptypes.number.isRequired,
};

export default HrText;
