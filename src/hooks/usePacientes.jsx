import { useContext } from "react";
import PacientesContex from "../contex/PacientesProviders";

const usePacientes = () => {
  return useContext(PacientesContex);
};

export default usePacientes;
