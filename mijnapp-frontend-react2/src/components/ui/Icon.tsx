import React from 'react';
import {SvgIcon} from '@material-ui/core';
import {colors} from '../../assets/colors';


class CustomSvgIconData {
    icon: any;
    color?: string;
    disabled?: boolean;
}

const Icon = ({icon, color, disabled}: CustomSvgIconData) => {
    return (
        <div style={{display: 'flex', margin: 'auto'}}>
            <SvgIcon style={{fill: disabled ? colors.midGrey : color ? color : colors.black}}
                     component={icon}
                     />
        </div>
    );
};

export default Icon;
