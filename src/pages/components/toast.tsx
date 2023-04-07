import { baseUrl } from "@/utils/base";
import { toast } from "react-toastify";


export const showToast = async ({ path, method = "GET", body }: any) => {
    // body: method !== "GET" && ...({ body: JSON.stringify(body) }),
    const response = await toast.promise(
        fetch(`${baseUrl}${path}`, {
            method,
            ...(method !== "GET" && { body: JSON.stringify(body) }),
            headers: {
                'Content-Type': 'application/json'
            }
        }),
        {
            pending: 'Cargando...',
            success: 'Registro exitoso',
            error: 'Hubo un problema'
        }
    );

    const data = await response.json()
    console.log("🚀 ------------------------------------------------🚀")
    console.log("🚀 ~ file: toast.tsx:23 ~ showToast ~ data:", data)
    console.log("🚀 ------------------------------------------------🚀")
    return data
}