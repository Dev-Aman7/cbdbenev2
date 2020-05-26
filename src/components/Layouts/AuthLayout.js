import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Grid,
    Hidden,
    Box,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    banner: {
        background: '#071928',
        color: 'white',
    },
    goBackBtn: {
        cursor: 'pointer',
    },
    backBar: {
        marginBottom: theme.spacing(3),
    },
}));

const fullHeightStyle = {
    minHeight: '100vh',
    height: '100%',
    overflow: 'auto',
};

const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

function AuthLayout(props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item md={5} sm={12} xs={12}>
                <Box>
                    <AppBar
                        position='sticky'
                        color='transparent'
                        className={classes.backBar}
                        elevation={0}
                    >
                        <Toolbar>
                            <div
                                className={classes.goBackBtn}
                                role='button'
                                tabIndex={0}
                                onClick={props.history.goBack}
                                onKeyDown={props.history.goBack}
                            >
                                <Grid
                                    container
                                    alignContent='center'
                                    justify='center'
                                >
                                    <Grid item>
                                        <ArrowBackIosIcon />
                                    </Grid>
                                    <Hidden smDown>
                                        <Grid item>
                                            <Typography>Go back</Typography>
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {props.children}
                </Box>
            </Grid>
            <Hidden smDown>
                <Grid item md={7}>
                    <Box
                        className={classes.banner}
                        style={{ ...fullHeightStyle, ...centerContentStyle }}
                    >
                        <img
                            className={classes.media}
                            src={props.bannerImg}
                            alt='welcome-text'
                        />
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    );
}

AuthLayout.propTypes = {
    bannerImg: PropTypes.elementType.isRequired,
};

export default withRouter(AuthLayout);
