import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const InfoIcon = () => {
    return (
        <SvgIcon viewBox='0 0 18 18' fontSize='small'>
            <svg fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z'
                    stroke='#071928'
                    strokeOpacity='0.4'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M9 12V9'
                    stroke='#071928'
                    strokeOpacity='0.4'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M9 6.00001H9.00875'
                    stroke='#071928'
                    strokeOpacity='0.4'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </SvgIcon>
    );
};

export default InfoIcon;
