import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [_id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(new Date(paciente.fecha).toISOString());
      setSintomas(paciente.sintomas);
      setId(paciente._id)
    }
  }, [paciente]);



  const handleSubmit = (e) => {
    e.preventDefault();

    //validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, _id });
    setAlerta({msg: 'Guardado', error: false});

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold"> administralos</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-white py-5 px-5 mb-10 lg:mb-2 rounded-2xl border border-gray-200 shadow-md mt-2"
      >
        <div className="mb-3">
          <div
            htmlFor="nombre"
            className="text-gray-700 uppercase font-semibold"
          >
            Nombre Mascota
          </div>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 border-gray-400 rounded-md bg-white"
          />
        </div>

        <div className="mb-3">
          <div
            htmlFor="propietario"
            className="text-gray-700 uppercase font-semibold"
          >
            Nombre Propietario
          </div>
          <input
            type="text"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            autoComplete="off"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 border-gray-400 rounded-md bg-white"
          />
        </div>

        <div className="mb-3">
          <div
            htmlFor="email"
            className="text-gray-700 uppercase font-semibold"
          >
            Email
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Nombre del email"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 border-gray-400 rounded-md bg-white"
          />
        </div>

        <div className="mb-3">
          <div
            htmlFor="fecha"
            className="text-gray-700 uppercase font-semibold"
          >
            Fecha Alta
          </div>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            autoComplete="off"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 border-gray-400 rounded-md bg-white"
          />
        </div>

        <div className="mb-3">
          <div
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-semibold"
          >
            Sintomas
          </div>
          <textarea
            id="sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            autoComplete="off"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 border-gray-400 rounded-md bg-white"
          />
        </div>

        <input
          type="submit"
          value={ _id ? 'Guardar Cambios' : "Agregar Paciente" }
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded hover:bg-indigo-700 hover:cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};

export default Formulario;
