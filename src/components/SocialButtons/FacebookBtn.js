import React from 'react';

import { IconButton } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookButton from '../../images/facebook-icon.svg';

export default function FacebookBtn() {
    const responseFacebook = (data) => {
        console.log('fb-response', data);
    };
    return (
        <FacebookLogin
            appId='597883154150892'
            autoLoad={false}
            cookie={false}
            callback={responseFacebook}
            render={(renderProps) => (
                <IconButton onClick={renderProps.onClick}>
                    <img src={FacebookButton} alt='facebook-social-btn' />
                </IconButton>
            )}
        />
    );
}
