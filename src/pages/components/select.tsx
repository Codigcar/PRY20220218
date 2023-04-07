
import { MenuItem, Select } from "@material-ui/core";
import { FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";


type Props = {
    name: string
    control: Control<FieldValues> | undefined
    options: any
    label: string
    // valueData: string
    // onChangeData: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
}

export const CSelect = ({ name, control, options, label, }: Props) => {
    const generateSelectOptions = () => {
        return options.map((option: any) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return <Controller
        control={control}
        name={name}
        render={({
            field: { onChange, value },
            fieldState: { invalid, error }
        }) => (
            <FormControl fullWidth variant="outlined">
                <InputLabel error={invalid}>Seleccionar entrenador</InputLabel>
                <Select
                    value={value}
                    label="Entrenador"
                    onChange={onChange}
                    error={invalid}
                >
                    {generateSelectOptions()}
                </Select>
                {/* {error && <FormHelperText error>{error?.message}</FormHelperText>} */}
            </FormControl>
        )}
    />
}