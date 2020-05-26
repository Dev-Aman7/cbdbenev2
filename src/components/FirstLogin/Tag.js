import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
    Typography,
    Box,
    FormControl,
    OutlinedInput,
    InputLabel,
    IconButton,
    InputAdornment,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import CustomChip from '../Atoms/customChip';

import * as actionCreator from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    heading: {
        marginBottom: theme.spacing(5),
    },
    chip: {
        margin: '1rem',
    },
    tags__wrapper: {
        height: '30vh',
        overflow: 'auto',
        position: 'realtive',
        zIndex: 1,
    },
}));

function Tag(props) {
    useEffect(() => {
        props.getTags();
    }, []);
    // The first commit of Material-UI
    const handleClick = (id) => {
        console.info('You clicked the Chip.', id);
        props.selectTag(id);
    };

    const classes = useStyles();
    console.log('tags', props.tags);
    return (
        <Box>
            <Typography variant='h4' className={classes.heading}>
                Let&apos;s get technical!
            </Typography>
            <Typography variant='subtitle2'>
                Choose tag from 10-15 topics that you&apos;re familiar with
            </Typography>

            <FormControl size='small' variant='outlined' margin='normal'>
                <InputLabel>Search</InputLabel>
                <OutlinedInput
                    size='small'
                    id='username'
                    // classes={{ input: classes.formFields }}
                    // value={props.username}
                    // onChange={(e) => props.update('username', e.target.value)}
                    label='Username'
                    endAdornment={
                        <InputAdornment position='end'>
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Box mt={3} className={classes.tags__wrapper}>
                {props.tags.map((el, index) => {
                    return (
                        <CustomChip id={el} key={el} onClick={handleClick} />
                    );
                })}

                {/* <CustomChip id='c++' onClick={handleClick} />
                <CustomChip id='python' onClick={handleClick} />
                <CustomChip id='java' onClick={handleClick} />
                <CustomChip id='c++' onClick={handleClick} />
                <CustomChip id='python' onClick={handleClick} />
                <CustomChip id='java' onClick={handleClick} />
                <CustomChip id='c++' onClick={handleClick} />
                <CustomChip id='python' onClick={handleClick} />
                <CustomChip id='java' onClick={handleClick} />
                <CustomChip id='c++' onClick={handleClick} /> */}
            </Box>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    tags: state.first.tags,
});

const mapDispatchToProps = {
    getTags: () => actionCreator.getTags(),
    selectTag: (value) => actionCreator.selectTag(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
