import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import * as yup from "yup";
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { generateSelectOptions } from "./create-team";
import { CHeader } from "./_document";
import showToast from "./components/toast";
import CInput from "./components/input";
import CButton from "./components/button";


const schema1 = yup.object().shape({
    player: yup.string().required("* Campo requerido"),
    weight: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    traveled_distance: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    calorie_consumption: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    average_heart_rate: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    time_played: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
});

const Calculation: NextPage = () => {

    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetchCustom({ path: '/team' }).then(resp => setTeams(resp))
    }, [])

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const onSubmit = async (body: any) => {
        await showToast({ path: '/exercise-calculation', method: "POST", body })
    }


    return (
        <div>
            <CHeader />
            <ToastContainer />
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                <div style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Controller
                        control={control}
                        name="player"
                        render={({
                            field: { onChange, value },
                            fieldState: { invalid, error }
                        }) => (
                            <FormControl fullWidth>
                                <InputLabel error={invalid}>Selecciona un equipo</InputLabel>
                                <Select
                                    value={value}
                                    label="Selecciona un equipo"
                                    onChange={onChange}
                                    error={invalid}
                                >
                                    {generateSelectOptions(teams)}
                                </Select>
                                {error && <FormHelperText error>{error?.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </div>

                <CInput
                    name="weight"
                    control={control}
                    label="Peso corporal"
                />

                <CInput
                    name="traveled_distance"
                    control={control}
                    label="Distancia recorrida"
                />
                <CInput
                    name="calorie_consumption"
                    control={control}
                    label="Consumo calorias"
                />
                <CInput
                    name="average_heart_rate"
                    control={control}
                    label="Media ritmo Cardiaco"
                />
                <CInput
                    name="time_played"
                    control={control}
                    label="Tiempo jugando"
                />

                <CButton
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Calculation