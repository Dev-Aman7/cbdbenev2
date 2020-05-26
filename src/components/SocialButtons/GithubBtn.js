import React from 'react';
import crypto from 'crypto';
import { IconButton, Link } from '@material-ui/core';
import GithubButton from '../../images/github-icon.svg';

export default function GithubBtn() {
    const githubState = crypto.randomBytes(64).toString('hex');
    const clientId = 'dd4eab217b3a487a9527';

    return (
        <Link
            href={`https://github.com/login/oauth/authorize?clientId=${clientId}&state=${githubState}`}
        >
            <IconButton>
                <img src={GithubButton} alt='github-social-btn' />
            </IconButton>
        </Link>
    );
}
