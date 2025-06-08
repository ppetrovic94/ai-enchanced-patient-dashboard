import React, { useMemo } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

export interface SelectFieldProps<T> {
    label: string;
    value: T;
    onChange: (value: T) => void;
    options: readonly { value: T; label: string }[];
    className?: string;
}

export const SelectField = React.memo(<T extends string>({
    label,
    value,
    onChange,
    options,
    className
}: SelectFieldProps<T>) => {

    const menuItems = useMemo(() =>
        options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        )),
        [options]
    );

    return (
        <FormControl className={className}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value as T)}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}) as <T extends string>(props: SelectFieldProps<T>) => React.JSX.Element; 