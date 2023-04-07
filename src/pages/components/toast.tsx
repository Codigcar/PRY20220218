import { baseUrl } from "@/utils/base";
import { useRef } from "react";
import { toast } from "react-toastify";


const showToast = async ({ path, method = "GET", body }: any) => {
    const id = toast.loading("Please wait...")
    const resp = await fetch(`${baseUrl}${path}`, {
        method,
        ...(method !== "GET" && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async res => {
        const data = await res.json()
        if (!data._id) {
            toast.update(id, {
                render: data.message,
                type: "error",
                isLoading: false,
                autoClose: 4000,
                closeButton: true,
            });

            return {
                status: false,
                data
            }

        }
        toast.update(id, {
            render: "Todo correcto",
            type: "success",
            isLoading: false,
            autoClose: 4000,
            closeButton: true
        });

        return {
            status: true,
            data
        }
    }).catch(err => {
        toast.update(id, {
            render: err.message,
            type: "error",
            isLoading: false,
            autoClose: 4000,
            closeButton: true
        });
        return {
            status: false,
            data: err
        }
    });
    return resp
}

export default showToast