import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    // <nav className="flex gap-3">
    //   <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">
    //     Perfil
    //   </Link>
    //   <Link to="/admin/cambiar-password" className="font-bold uppercase text-gray-500">
    //     Cambiar Password
    //   </Link>
    // </nav>
    <nav className="flex gap-3">
      <NavLink
        to="/admin/perfil"
        className={({ isActive }) =>
          `font-bold uppercase ${
            isActive ? "text-indigo-700" : "text-gray-500"
          }`
        }
      >
        Perfil
      </NavLink>

      <NavLink
        to="/admin/cambiar-password"
        className={({ isActive }) =>
          `font-bold uppercase ${
            isActive ? "text-indigo-700" : "text-gray-500"
          }`
        }
      >
        Cambiar Password
      </NavLink>
    </nav>
  );
};

export default AdminNav;
