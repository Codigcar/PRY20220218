import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { CInput } from "./components/input";
import { CButton } from "./components/button";

const schema = yup.object().shape({
  email: yup.string().required("Campo requerido").email("Correo inválido"),
  password: yup.string().required("Campo requerido"),
});

const Auth: NextPage = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: any) => {
    // await showToast({ path: '/user', method: "POST", body })
    router.push("/teams");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "65%",
          height: "100%",
          backgroundColor: "green",
        }}
      >
        <div>Imagen</div>
      </div>
      <div
        style={{
          width: "35%",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ width: '80%' }}>
            <CInput
              control={control}
              name="email"
              label="Correo electrónico"
            />
            <CInput
              control={control}
              name="password"
              label="Contraseña"
            />
            <CButton
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
