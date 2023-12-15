import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>

      <nav className="flex">
        <Link className="text-blue-600 mr-2 hover:underline" to="paints">
          Paints
        </Link>
        <Link className="text-blue-600 mr-2 hover:underline" to="messages">
          Messages
        </Link>
        <Link
          className="text-blue-600 mr-2 hover:underline"
          to="persons-with-emails"
        >
          PWEs
        </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Admin;
