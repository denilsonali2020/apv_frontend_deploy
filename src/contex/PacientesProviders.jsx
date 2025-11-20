import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContex = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, SetPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      if (!auth) return setPacientes([]);

      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data.pacientes);
        if (!token) return;
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [auth]); //-MEJORA0.1-hace que ejecute si auth cambia

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //logica si existe un _id se edita si no crea un nuevo paciente
    if (paciente._id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente._id}`,
          paciente,
          config
        );
        //comparar el paciente actualizado de la res.json del backend y actualizarlo
        //con el pacienteState._id con el que coincida en el state de pacientes
        const { pacienteActulizado } = data;

        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === pacienteActulizado._id
            ? pacienteActulizado
            : pacienteState
        );

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.pacienteGuardado;        
        setPacientes((prev) => [...prev, pacienteAlmacenado]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    SetPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Desea eliminar el Paciente?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await clienteAxios.delete(`/pacientes/${id}`, config);
        const statePacientesActualizado = pacientes.filter(
          (pacienteState) => pacienteState._id !== id
        );
        setPacientes(statePacientesActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <PacientesContex.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContex.Provider>
  );
};

export default PacientesContex;
