import { Button } from "@mui/material"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"

type Props = {
    text?: string
    handleSubmit: UseFormHandleSubmit<FieldValues>
    onSubmit: (body: any) => Promise<void>
}

export const CButton = ({ text = "Registrar", handleSubmit, onSubmit }: Props) => {
    return <Button variant="contained" size="large" fullWidth onClick={handleSubmit(onSubmit)}>
        {text}
    </Button>
}