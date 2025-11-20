import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const { guardarPassword } = useAuth();
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if(Object.values(password).some((campo) => campo === "")) {
      setAlerta({msg: "Todos los campos son obligatorios", error: true});
      return;
    }

    if(password.pwd_actual.trim().length < 6) {
      setAlerta({msg: "El nuevo password debe tener minimo 6 caracteres", error: true});
      return;
    }

    const respuesta = await guardarPassword({password});
    setAlerta(respuesta);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-8 md:mt-1">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-5 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold"> Password aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-xl p-5">
          {msg && <Alerta alerta={alerta} />}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="pwd_actual"
                placeholder="Escribe tu password actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Nuevo Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded border-gray-300"
                name="pwd_nuevo"
                placeholder="Tu Nuevo Password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-600 px-8 py-2 font-bold text-white rounded-xl uppercase w-full hover:cursor-pointer hover:bg-indigo-700 mt-5"
              value="Actualizar Password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
