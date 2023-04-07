import { TextField } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldValues } from "react-hook-form"

type Props = {
    control: Control<FieldValues> | undefined
    name: string
    label: string
    type?: string
}

const CInput: FC<Props> = ({ control, name, label, type }) => {
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
                        type={type}
                    />
                )}
            />
        </div>

    )
}

export default CInput