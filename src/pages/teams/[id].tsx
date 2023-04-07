import { NextPage, GetServerSideProps } from "next";
import { fetchCustom } from "@/utils/fetchCustom";
import { CHeader } from "../_document";


const TeamById: NextPage<any> = ({ team }: any) => {
    return (
        <div>
            <CHeader />
            <h1 style={{ padding: 20 }}>{team.name}</h1>
            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '48%' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Entrenador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{team.coach.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ width: '48%' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Jugador</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Altura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                team.players?.map((player: any, index: any) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{player.name}</td>
                                        <td>{player.age}</td>
                                        <td>{player.height}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };
    const team = await fetchCustom({ path: `/team/${id}` });

    if (!team) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            team,
        },
    };
};

export default TeamById;