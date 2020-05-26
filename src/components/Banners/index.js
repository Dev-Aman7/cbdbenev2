import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import SingleBanner from './SingleBanner';

export default class Banners extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banners: [],
        };
    }

    componentDidMount() {
        // fetch banners
        const banners = [];
        this.setState({ banners });
    }

    render() {
        const { banners } = this.state;

        return (
            <Grid container direction='column'>
                {banners.map((banner) => (
                    <SingleBanner
                        content={banner}
                        key={`banner-${Date.now()}`}
                    />
                ))}
            </Grid>
        );
    }
}
