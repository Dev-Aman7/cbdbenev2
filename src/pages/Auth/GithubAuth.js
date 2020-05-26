import React, { useEffect } from 'react';
import axios from 'axios';

export default function GithubAuth(props) {
    const paramString = props.location.search;

    const codeIndex = paramString.indexOf('code');
    const stateIndex = paramString.indexOf('state');

    const githubCode = paramString.substring(codeIndex, stateIndex - 1);
    const githubState = paramString.substring(stateIndex);

    useEffect(() => {
        axios
            .post('https://github.com/login/oauth/access_token', {
                params: {
                    clientId: 'dd4eab217b3a487a9527',
                    client_secret: 'fa51999afbbd2e4ef4b91fa7ba53b5329be41c9e',
                    code: githubCode,
                    state: githubState,
                },
            })
            .then((data) => {
                console.log('github page data', data);
            })
            .catch((err) => {
                console.log('github page err', err);
            });
    }, [githubCode, githubState]);

    if (codeIndex === -1 || stateIndex === -1) {
        return <div>Something went wrong</div>;
    }

    return (
        <div>
            github code: {githubCode}
            <br />
            github state: {githubState}
        </div>
    );
}
