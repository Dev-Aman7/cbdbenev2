import React from 'react';

import { IconButton } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import GoogleButton from '../../images/google-icon.svg';

export default function GoogleBtn(props) {
    const responseGoogle = (response) => {
        // console.log("this is google object", response);
        props.googleHandler(response);
    };

    return (
        <GoogleLogin
            clientId='350269454381-6u2uqbnn53k7jhs0tcqvup4cunc3p1ub.apps.googleusercontent.com'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
            render={(renderProps) => (
                <IconButton
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <img src={GoogleButton} alt='google-social-btn' />
                </IconButton>
            )}
        />
    );
}
