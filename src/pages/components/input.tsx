import { TextField } from "@mui/material"
import { Control, Controller, FieldValues } from "react-hook-form"

type Props = {
    control: Control<FieldValues> | undefined
    name: string
    label: string
}

export const CInput = ({ control, name, label, ...props }: Props) => {
    return (
        <div style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                }) => (
                    <TextField
                        onChange={onChange}
                        value={value}
                        label={label}
                        error={invalid}
                        helperText={error?.message}
                        fullWidth
                        autoComplete="off"
                        {...props}
                    />
                )}
            />
        </div>

    )
}