import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import * as yup from "yup";
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useState } from "react";

import { generateSelectOptions } from "./create-team";
import { CHeader } from "./_document";
import ShowToast from "../components/toast";
import CInput from "../components/input";
import CButton from "../components/button";


const schema1 = yup.object().shape({
    player: yup.string().required("* Campo requerido"),
    average_speed: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    maximum_speed: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    traveled_distance: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    sprint: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    average_heart_rate: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    time_played: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
});

const Calculation: NextPage = () => {
    const [teams, setTeams] = useState([])
    const [calculation, setCalculation] = useState<any>([])

    useEffect(() => {
        fetchCustom({ path: '/player' }).then(resp => setTeams(resp))
    }, [])

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const onSubmit = async (body: any) => {
        const exercise = await ShowToast({ path: '/exercise-calculation', method: "POST", body })
        if (!exercise.status) return
        setCalculation(exercise.data)
    }

    return (
        <div>
            <CHeader />
            <div style={{ display: 'flex', marginTop: 30, flexDirection: 'column' }}>
                <h2 style={{ textAlign: 'center', paddingTop: 15, paddingBottom: 15 }}>Registro del Artefacto IoT</h2>
                <div style={{ width: '65%', margin: 'auto' }}>
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
                                        <InputLabel error={invalid}>Selecciona un futbolista</InputLabel>
                                        <Select
                                            value={value}
                                            label="Selecciona un futbolista"
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
                            name="average_speed"
                            control={control}
                            label="Velocidad media"
                        />
                        <CInput
                            name="maximum_speed"
                            control={control}
                            label="Velocidad máxima"
                        />
                        <CInput
                            name="traveled_distance"
                            control={control}
                            label="Distancia recorrida"
                        />
                        <CInput
                            name="sprint"
                            control={control}
                            label="Sprint"
                        />
                        <CInput
                            name="average_heart_rate"
                            control={control}
                            label="Frecuencia Cardiaca media"
                        />
                        <CInput
                            name="time_played"
                            control={control}
                            label="Tiempo jugador"
                        />

                        <CButton
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Calculation