import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import { Navigate } from "react-router-dom";

const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const autenticarUsuario = async () => {
      //comprobamos que exista un token
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);

        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth(null);
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  const actualizarPerfil = async (datos) => {
    //comprobamos que exista un token
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await clienteAxios.put(url, datos, config);
      return {
        msg: "Cambios Guardados",
        erro: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    //comprobamos que exista un token
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = '/veterinarios/actualizar-password';
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: data.msg,
        error: false
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  return (
    <AuthContex.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
