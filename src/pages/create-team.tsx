import { NextPage } from "next";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CInput } from "./components/input";
import * as yup from "yup";

import { showToast } from "./components/toast";
import { fetchCustom } from "@/utils/fetchCustom";
import { CButton } from "./components/button";
import { CHeader } from "./_document";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const optionsMocks = [
    {
        label: "Dropdown Option 1",
        value: "1",
    },
    {
        label: "Dropdown Option 2",
        value: "2",
    },
];

const schema1 = yup.object().shape({
    name: yup.string().required("* Campo requerido")
});

const schema2 = yup.object().shape({
    name: yup.string().required("* Campo requerido"),
    coach: yup.string().required("* Campo requerido")
});

const schema3 = yup.object().shape({
    name: yup.string().required("* Campo requerido"),
    age: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    height: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    weight: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    team: yup.string().required("* Campo requerido"),
});


export const generateSelectOptions = (options = optionsMocks) => {
    return options.map((option: any) => {
        return (
            <MenuItem key={option._id} value={option._id}>
                {option.name}
            </MenuItem>
        );
    });
};

const CreateTeam: NextPage = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0)
    const [coachs, setCoachs] = useState<any>([])
    const [teams, setTeams] = useState<any>([])

    useEffect(() => {
        fetchCustom({ path: '/coach' }).then(resp => setCoachs(resp))
        fetchCustom({ path: '/team' }).then(resp => setTeams(resp))
    }, [])


    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const { handleSubmit: handleSubmit2, control: control2 } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema2),
    });

    const { handleSubmit: handleSubmit3, control: control3 } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema3),
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const onSubmit = async ({ name, coach }: any) => {
        const newCoach = await showToast({ path: '/coach', method: "POST", body: { name, coach } })
        if (!newCoach.status) return
        setCoachs([...coachs, newCoach.data])
    };

    const onSubmit2 = async (body: any) => {
        const newTeam = await showToast({ path: '/team', method: "POST", body })
        console.log("🚀 -------------------------------------------------------------🚀")
        console.log("🚀 ~ file: create-team.tsx:139 ~ onSubmit2 ~ newTeam:", newTeam)
        console.log("🚀 -------------------------------------------------------------🚀")
        if (!newTeam.status) return
        setTeams([...teams, newTeam.data])
    }

    const onSubmit3 = async (body: any) => {
        await showToast({ path: '/player', method: "POST", body })
    }

    const StepOne = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                <CInput
                    control={control}
                    label="Nombre del entrenador"
                    name="name"
                />
                <CButton
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                />
            </div>

        )
    }

    const StepTwo = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                <CInput
                    control={control2}
                    label="Nombre del equipo"
                    name="name"
                />
                <div style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Controller
                        control={control2}
                        name="coach"
                        render={({
                            field: { onChange, value },
                            fieldState: { invalid, error }
                        }) => (
                            <FormControl fullWidth>
                                <InputLabel error={invalid}>Seleccionar entrenador</InputLabel>
                                <Select
                                    value={value}
                                    label="Entrenador"
                                    onChange={onChange}
                                    error={invalid}
                                >
                                    {generateSelectOptions(coachs)}
                                </Select>
                                {error && <FormHelperText error>{error?.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </div>
                <CButton
                    handleSubmit={handleSubmit2}
                    onSubmit={onSubmit2}
                />
            </div>
        )
    }

    const StepThree = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                <CInput
                    key="1"
                    name="name"
                    control={control3}
                    label="Nombre"
                />
                <CInput
                    key="2"
                    name="age"
                    control={control3}
                    label="Edad"
                />
                <CInput
                    key="3"
                    name="height"
                    control={control3}
                    label="Estatura"
                />
                <CInput
                    key="4"
                    name="weight"
                    control={control3}
                    label="Peso corporal"
                />


                <div style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Controller
                        control={control3}
                        name="team"
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
                {/* <Button variant="contained" size="large" onClick={handleSubmit3(onSubmit3)}>
                    Registrar
                </Button> */}
                <CButton
                    handleSubmit={handleSubmit3}
                    onSubmit={onSubmit3}
                />
            </div>
        )
    }

    return (
        <>
            <CHeader />
            <form>
                {/* <ToastContainer /> */}
                <Box sx={{ borderColor: '#E7EBEF', borderWidth: 8, width: "80%", margin: 'auto', marginTop: 8 }}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Entrenador" {...a11yProps(0)} />
                            <Tab label="Equipo" {...a11yProps(1)} />
                            <Tab label="Jugador" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel key="1" value={value} index={0} dir={theme.direction}>
                            <StepOne />
                        </TabPanel>

                        <TabPanel key="2" value={value} index={1} dir={theme.direction}>
                            <StepTwo />
                        </TabPanel>
                        <TabPanel key="3" value={value} index={2} dir={theme.direction}>
                            <StepThree />
                        </TabPanel>

                    </SwipeableViews>
                </Box>
            </form>
        </>

    );
};

export default CreateTeam;
