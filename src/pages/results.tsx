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
import CButton from "@/components/button";

const schema1 = yup.object().shape({
    player: yup.string().required("* Campo requerido"),
});

const Results: NextPage = () => {
    const [teams, setTeams] = useState([])
    const [calculation, setCalculation] = useState<any>(null)

    useEffect(() => {
        fetchCustom({ path: '/player' }).then(resp => setTeams(resp))
    }, [])

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const onSubmit = async (body: any) => {
        const response = await ShowToast({ path: `/exercise-calculation/player/${body.player}`, method: "GET" })
        if (!response.status) return
        setCalculation(response.data)
    }

    return (
        <div>
            <CHeader />
            <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ width: '48%' }}>
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
                            <div style={{ paddingTop: 30 }}>
                                <CButton
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    text="Realizar Análisis"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '48%', marginTop: 10 }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Resultado de análisis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        Posición del campo : {calculation?.player?.role}
                                    </div>
                                    <div>
                                        Nombre del futbolista : {calculation?.player?.name}
                                    </div>
                                    <div>
                                        <br />
                                    </div>
                                    <div>
                                        Velocidad media: {calculation?.average_speed_calculated.toFixed(2)} {calculation?.average_speed_calculated && '%'}
                                    </div>
                                    <div>
                                        Velocidad máxima: {calculation?.maximum_speed_calculated.toFixed(2)} {calculation?.maximum_speed_calculated.toFixed(2) && '%'}
                                    </div>
                                    <div>
                                        Distancia Recorrida: {calculation?.traveled_distance_calculated.toFixed(2)} {calculation?.traveled_distance_calculated.toFixed(2) && '%'}
                                    </div>
                                    <div>
                                        Sprint (máxima velocidad): {calculation?.sprint_calculated.toFixed(2)} {calculation?.sprint_calculated.toFixed(2) && '%'}
                                    </div>
                                    <div>
                                        Frecuencia Cardiaca: {calculation?.average_heart_rate_calculated.toFixed(2)} {calculation?.average_heart_rate_calculated.toFixed(2) && '%'}
                                    </div>
                                    <div>
                                        Tiempo jugado: {calculation?.time_played_calculated.toFixed(2)}  {calculation?.time_played_calculated.toFixed(2) && '%'}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Results