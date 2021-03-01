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
            padding: '0 10px',
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
    startAdornment: {
        height: 'auto',
        width: 'auto',
        margin: '0 0 0 10px'
    },
    endAdornment: {
        height: 'auto',
        width: 'auto',
        margin: '0 10px 0 0'
    },
    notchedOutline: {},
    focused: {},
});

interface MatInputData {
    id?: string;
    type?: string;
    inputRef?: any;
    className?: string;
    isSecret?: boolean;
    label?: any;
    placeholder?: string;
    value?: any;
    onChange?: any;
    onFocus?: any;
    startAdornment?: any;
    endAdornment?: any;
    valid?: boolean;
    required?: boolean;
}

const MatInput = (
    {
        id,
        type,
        inputRef,
        className,
        isSecret,
        label,
        placeholder,
        value,
        onChange,
        onFocus,
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
            {label && <label className={classes.label}>{label}</label>}
            <OutlinedInput
                id={id}
                inputRef={inputRef}
                type={isSecret ? passwordVisibility ? 'text' : 'password' : type || 'text'}
                classes={{
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused
                }}
                error={!(!valid || isDirty)}
                placeholder={placeholder}
                value={value}
                onFocus={onFocus}
                onBlur={() => setDirty(!!(!value && required))}
                onChange={onChange}
                startAdornment={
                    startAdornment &&
                    <InputAdornment className={classes.startAdornment} position="start">
                        {startAdornment}
                    </InputAdornment>
                }
                endAdornment={
                    (endAdornment || isSecret) &&
                    <InputAdornment className={classes.endAdornment} position="end">
                        {endAdornment}
                        {isSecret && <IconButton aria-label="toggle password visibility"
                                                 onClick={handleClickShowPassword}
                                                 onMouseDown={handleMouseDownPassword}
                                                 edge="end">
                            {passwordVisibility ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>}
                    </InputAdornment>
                }/>
        </FormControl>
    );
};

export default MatInput;
