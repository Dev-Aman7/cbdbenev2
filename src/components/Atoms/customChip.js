import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

export default function SmallChips(props) {
    const { id, onClick: pHandleClick, variant: pVariant } = props;

    const [variant, setVariant] = useState('default' || pVariant);

    const handleClick = () => {
        if (variant === 'default') {
            setVariant('outlined');
        } else {
            setVariant('default');
        }
        pHandleClick(id);
    };

    return (
        <Chip
            id={id}
            variant={variant}
            style={{ margin: '0.5rem' }}
            // icon={<FaceIcon />}
            label={id}
            clickable
            // color='secondary'
            // style={{ fontSize: '18px' }}
            onClick={handleClick}
        />
    );
}
