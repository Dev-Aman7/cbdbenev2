import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FirstLoginBanner from '../../images/first-login-banner.svg';

import FirstLoginLayout from '../../components/Layouts/FirstLoginLayout';
import Tag from '../../components/FirstLogin/Tag';
import ExperienceLevel from '../../components/FirstLogin/ExperienceLevel';
import Username from '../../components/FirstLogin/Username';
import Language from '../../components/FirstLogin/Language/Language';
import BirthDate from '../../components/FirstLogin/Birthdate';

import * as actionCreators from '../../store/actions/firstLogin';

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        minHeight: '100%',
        height: '100%',
    },
    tab: {
        textTransform: 'none',
        cursor: 'text',
    },
}));

function FirstLogin(props) {
    let component = null;

    // const onSelectHandler = (name, value) => {
    //     console.log(name, value);
    //     props.update(name, value);
    // };
    switch (props.stage) {
        case 0:
            component = <BirthDate />;
            break;
        case 1:
            component = <Username />;
            break;
        case 2:
            component = <Language />;
            break;
        case 3:
            component = <Tag />;
            break;

        default:
            component = <BirthDate />;
            break;
    }

    return (
        <FirstLoginLayout bannerImg={FirstLoginBanner}>
            {component}
        </FirstLoginLayout>
    );
}

const mapStateToProps = (state) => ({
    stage: state.first.stage,
});

const mapDispatchToProps = (dispatch) => ({
    update: (name, value) => dispatch(actionCreators.update(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstLogin);
