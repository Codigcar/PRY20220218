import { NextPage } from "next";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import theme from "@/config/theme";
import { CHeader } from "../_document";

export const borderColor = "#C1C1C1"

const List: NextPage = () => {
    const [teams, setTeams] = useState([])
    const router = useRouter()
    useEffect(() => {
        fetchCustom({ path: '/team' }).then(resp =>
            setTeams(resp)
        )
    }, [])

    const handleDetails = (id: string) => {
        router.push(`/teams/${id}`)
    }

    return (
        <>
            <CHeader />
            <div style={{ width: '80%', margin: 'auto', marginTop: 50, marginBottom: 100 }}>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Equipo</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teams.map((team: any, index: any) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {team.name}
                                        </div>
                                    </td>
                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                        <Button variant="outlined" onClick={() => handleDetails(team._id)}>
                                            Ver detalle
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default List