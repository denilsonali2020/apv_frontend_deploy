import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const { veterinario } = auth;
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(veterinario);
  }, [veterinario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validar solo nombre e email
    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({ msg: "El nombre y el Email son Obligatorios", error: true });
      return;
    }

    //si pasa la validacion guardamos cambios en el state global y en la DB
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-8 md:mt-1">
        Editar Perfil
      </h2>
      <p className="text-xl mt-5 mb-5 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold"> Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-xl p-5">
          {msg && <Alerta alerta={alerta} />}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Telefono
              </label>
              <input
                type="tel"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-600 px-8 py-2 font-bold text-white rounded-xl uppercase w-full hover:cursor-pointer hover:bg-indigo-700 mt-5"
              value="Guardar Cambios"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
