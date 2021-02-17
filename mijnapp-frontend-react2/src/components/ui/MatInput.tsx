import React, {useState} from 'react';
import {FormControl, IconButton, InputAdornment, makeStyles, OutlinedInput} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    wrapper: {
        height: 'auto',
        minHeight: '75px',
        width: '100%'
    },
    label: {
        fontSize: '16px',
        marginBottom: '10px'
    },
    input: {
        height: 'auto',
        minHeight: '45px',
        padding: '0',
        borderRadius: '8px',
        backgroundColor: colors.white,

        '& input': {
            height: '100%',
            width: '100%',
            padding: '0 14px',
            margin: 'auto',
        },

        '&:hover $notchedOutline': {
            border: `2px solid ${colors.primary}`
        },

        '&$focused $notchedOutline': {
            border: `2px solid ${colors.primary}`
        },
    },
    secretIcon: {
        height: 'auto',
        width: 'auto',
        margin: '0 14px 0 0'
    },
    notchedOutline: {},
    focused: {},
});

class MatInputData {
    id?: string;
    type?: string;
    className?: string;
    isSecret?: boolean;
    label?: any;
    placeholder?: string;
    value?: any;
    onChange?: any;
    startAdornment?: any;
    endAdornment?: any;
    valid?: boolean;
    required?: boolean;
}

const MatInput = (
    {
        id,
        type,
        className,
        isSecret,
        label,
        placeholder,
        value,
        onChange,
        startAdornment,
        endAdornment,
        valid,
        required
    }: MatInputData) => {
    const classes = useStyles();
    const [isDirty, setDirty] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    return (
        <FormControl className={classes.wrapper + ' ' + className ? className : ''}
                     error={!valid || isDirty}
                     variant="outlined">
            <label className={classes.label}>{label}</label>
            <OutlinedInput
                id={id}
                type={isSecret ? passwordVisibility ? 'text' : 'password' : type || 'text'}
                classes={{
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused
                }}
                error={!(!valid || isDirty)}
                placeholder={placeholder}
                value={value}
                onBlur={() => setDirty(!!(!value && required))}
                onChange={onChange}
                startAdornment={startAdornment}
                endAdornment={
                    <>
                        {isSecret
                            ? <InputAdornment className={classes.secretIcon} position="end">
                                <IconButton aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                    {passwordVisibility ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                            : endAdornment
                        }
                    </>
                }/>
        </FormControl>
    );

};

export default MatInput;
