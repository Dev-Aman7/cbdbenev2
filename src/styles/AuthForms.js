/* eslint-disable */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    formFields: {
        fontSize: 14,
    },
    hrContainer: {
        margin: theme.spacing(3, 0),
        width: '100%',
    },
    hrText: {
        textAlign: 'center',
    },
    hrStyles: {
        margin: theme.spacing(1, 0),
        background: 'rgba(7, 25, 40, 0.2)',
    },
    textLight: {
        color: 'rgba(7, 25, 40, 0.4)',
        fontSize: '12px',
    },
    paddedCenterBox: {
        textAlign: 'center',
        margin: theme.spacing(2, 0),
    },
}));

export default useStyles;
