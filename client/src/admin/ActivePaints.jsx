import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PaintCan } from "./PaintCan";
import { AuthContext } from "../useAuthContext";

const PaintChipAdmin = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/login");
  }
  const [paintChips, setPaintChips] = useState([
    {
      rgb: "",
      brand: "",
      name: "",
      quantity: "",
      email: "",
      _id: "1",
    },
  ]);

  useEffect(() => {
    fetch(`/api/paints?zip=12345`)
      .then((x) => x.text())
      .then((t) => {
        setPaintChips(JSON.parse(t));
      });
  }, []);

  const handleDelete = (id) => {
    setPaintChips(paintChips.filter((p) => p._id !== id));
  };
  let thePaints = paintChips.map((chip) => {
    return <PaintCan key={chip._id} paintUnit={chip} onDelete={handleDelete} />;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Commands</th>
        </tr>
      </thead>
      <tbody>{thePaints}</tbody>
    </table>
  );
};

export default PaintChipAdmin;
