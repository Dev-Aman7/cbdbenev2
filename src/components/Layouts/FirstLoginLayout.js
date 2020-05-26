import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';

import Button from '@material-ui/core/Button';
import {
    Grid,
    Hidden,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';
import * as actionCreator from '../../store/actions/firstLogin';

const useStyles = makeStyles((theme) => ({
    contentBox: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        paddingTop: theme.spacing(10),
        '@media (max-width:780px)': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            paddingTop: theme.spacing(10),
            // eslint-disable-line no-useless-computed-key
        },
    },
    leftContent: {
        height: '100%',
        // padding: theme.spacing(0, 3),
    },
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
    progress: {
        paddingTop: '0.5rem',
    },
    media: {
        width: '100%',
        minHeight: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        bottom: 0,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    },
    footer: {
        position: 'absolute',
        padding: 0,
        bottom: '5rem',
        paddingLeft: theme.spacing(10),
        width: '90%',
        '@media (max-width:780px)': {
            // eslint-disable-line no-useless-computed-key

            paddingLeft: theme.spacing(6),
        },
    },
    next: {
        width: '15rem',
        marginLeft: '1rem',
        height: '2.5rem',
        '@media (max-width:780px)': {
            // eslint-disable-line no-useless-computed-key
            width: '6rem',
        },
    },
    back: {
        height: '2.5rem',
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

function FirstLoginLayout(props) {
    const classes = useStyles();

    return (
        <Grid container direction='row' alignItems='stretch'>
            <Grid item md={8} sm={12} xs={12}>
                <Container style={{ ...fullHeightStyle }}>
                    <Box className={classes.contentBox}>
                        <div className={classes.leftContent}>
                            {props.children}
                        </div>
                    </Box>
                </Container>
                <Grid container className={classes.footer}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Button
                            variant='outlined'
                            onClick={() => props.goBack()}
                            className={classes.back}
                        >
                            <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
                        </Button>
                        <Button
                            variant='containedPrimary'
                            onClick={() => props.next()}
                            className={classes.next}
                        >
                            Next
                        </Button>
                        {props.stage === 3 ? (
                            <Button
                                variant='textPrimary'
                                onClick={() => props.next()}
                                className={classes.next}
                            >
                                Selected({props.selectedTags.length})
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid
                        item
                        md={7}
                        sm={8}
                        xs={11}
                        className={classes.progress}
                    >
                        <LinearProgress
                            variant='determinate'
                            value={props.progress[props.stage]}
                        />
                    </Grid>
                    {/* <Grid item md={1} sm={1} xs={1}>
                            10%
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justify='space-between'
                                spacing={2}
                            >
                                <Grid item xs>
                                    <LinearProgress
                                        variant='determinate'
                                        value={10}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>10%</Typography>
                                </Grid>
                            </Grid>
                        </Grid> */}
                </Grid>
            </Grid>
            <Hidden smDown>
                <Grid item md={4}>
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

FirstLoginLayout.propTypes = {
    bannerImg: PropTypes.elementType.isRequired,
};

const mapStateToProps = (state) => ({
    progress: state.first.progress,
    stage: state.first.stage,
    selectedTags: state.first.selectedTags,
});

const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => dispatch(actionCreator.goBack()),
        next: () => dispatch(actionCreator.next()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(FirstLoginLayout));
