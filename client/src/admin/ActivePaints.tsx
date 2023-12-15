import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaintCan } from "./PaintCan";
import { getAdminPaints } from "./useAdminService";

const PaintChipAdmin = () => {
  const navigate = useNavigate();

  const { paintChips, setPaintChips } = getAdminPaints();

  const handleDelete = (id: string) => {
    setPaintChips(paintChips?.filter((p) => p._id !== id));
  };

  let thePaints = paintChips.map((chip) => {
    return <PaintCan key={chip._id} paintUnit={chip} onDelete={handleDelete} />;
  });

  return (
    <div>
      <p>
        <Link
          to="/adminMessages"
          className="underline text-blue-600 hover:text-amber-800"
        >
          Admin PWEs and Messages
        </Link>
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>donor PWE</th>
            <th>Email confirmed</th>
            <th>Commands</th>
          </tr>
        </thead>
        <tbody>{thePaints}</tbody>
      </table>
    </div>
  );
};

export default PaintChipAdmin;
