import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import * as yup from "yup";
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useState } from "react";

import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
// import { DateRange } from '@mui/x-date-pickers-pro';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

import { generateSelectOptions } from "./create-team";
import { CHeader } from "./_document";
import ShowToast from "../components/toast";
import CInput from "../components/input";
import CButton from "../components/button";
import { DateRange, DateRangeCalendar } from "@mui/x-date-pickers-pro";

import { DatePicker, Space } from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
const { RangePicker } = DatePicker;

const schema1 = yup.object().shape({
    // player: yup.string().required("* Campo requerido"),
    // average_speed: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    // maximum_speed: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    // traveled_distance: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    // sprint: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    // average_heart_rate: yup.number().typeError('* Debe ser un número').required("* Campo requerido").max(200, "* Debe ser menor que 200"),
    // time_played: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    date: yup.array(yup.string().required())
        .required('* Campo requerido')
});

const Calculation: NextPage = () => {
    const [teams, setTeams] = useState([])
    const [calculation, setCalculation] = useState<any>([])

    const [value, setValue] = useState<DateRange<Dayjs>>([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);

    useEffect(() => {
        fetchCustom({ path: '/player' }).then(resp => setTeams(resp))
    }, [])

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const onSubmit = async (data: any) => {
        const body = {
            ...data,
            start_date: data.date[0],
            end_date: data.date[1]
            // start_date: '2023/04/27',
            // end_date: '2023/05/04'
        }
        console.log("🚀 ---------------------------------------------🚀")
        console.log("🚀 ~ file: IoT.tsx:60 ~ onSubmit ~ body:", body)
        console.log("🚀 ---------------------------------------------🚀")
        const exercise = await ShowToast({ path: '/exercise-calculation', method: "POST", body })
        if (!exercise.status) return
        setCalculation(exercise.data)
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };


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
                        {/*  <Space direction="vertical" size={12} style={{ marginTop: 20, marginBottom: 20 }}>
                            <RangePicker
                                style={{ paddingTop: 15, paddingBottom: 15, width: '100%'}}
                                // status='error'
                                disabledDate={disabledDate}
                                onChange={(values, formatString) => {
                                    console.log({ values })
                                    console.log({ formatString })
                                }}
                                onCalendarChange={(values, formatString, info) => {
                                    console.log("🚀 -----------------------------------🚀")
                                    console.log("🚀 ~ file: IoT.tsx:132 ~ info:", info)
                                    console.log("🚀 -----------------------------------🚀")
                                    console.log("🚀 ---------------------------------------------------🚀")
                                    console.log("🚀 ~ file: IoT.tsx:132 ~ formatString:", formatString)
                                    console.log("🚀 ---------------------------------------------------🚀")
                                    console.log("🚀 ---------------------------------------🚀")
                                    console.log("🚀 ~ file: IoT.tsx:132 ~ values:", values)
                                    console.log("🚀 ---------------------------------------🚀")
                                }}
                                aria-errormessage="meststt"
                            />
                        </Space> */}

                        <Controller
                            name="date"
                            control={control}
                            render={({
                                field: { onChange: onChangeController, value },
                                fieldState: { invalid, error },
                            }) => (
                                <Space direction="vertical" size={12} style={{ marginTop: 20, marginBottom: 20 }}>
                                    <RangePicker
                                        style={{ paddingTop: 15, paddingBottom: 15, width: '100%', /*  border: '1px solid #C4C4C4', borderRadius: 6 */ }}
                                        // value={value}
                                        aria-errormessage="mensaje e"
                                        disabledDate={disabledDate}
                                        onChange={(_, formatString) => onChangeController(formatString)}
                                        status={error ? 'error' : ''}
                                    />
                                    {
                                        error ? <div style={{ color: 'red', fontSize: 12, paddingLeft: 10, marginTop: -7 }}>* Campo requerido</div> : null
                                    }

                                </Space>
                            )}
                        />


                        <CButton
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Calculation