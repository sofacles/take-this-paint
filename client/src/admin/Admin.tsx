import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <nav className="flex">
        <Link className="text-blue-600 mr-2 hover:underline" to="/admin/paints">
          Paints
        </Link>
        <Link
          className="text-blue-600 mr-2 hover:underline"
          to="/admin/messages"
        >
          Messages
        </Link>
        <Link
          className="text-blue-600 mr-2 hover:underline"
          to="/admin/persons-with-emails"
        >
          PWEs
        </Link>
      </nav>

      {/* <Outlet /> */}
    </>
  );
};

export default Admin;
