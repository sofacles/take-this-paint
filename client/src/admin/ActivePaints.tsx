import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PaintCan } from "./PaintCan";

const PaintChipAdmin = () => {
  const navigate = useNavigate();

  const [paintChips, setPaintChips] = useState([
    {
      _id: "1",
      brand: "",
      email: "",
      imageName: "",
      name: "",
      quantity: "",
      rgb: "",
      sheen: "",
      zipCode: "",
    },
  ]);

  useEffect(() => {
    fetch(`/api/admin/paints?zip=12345`)
      .then((x) => {
        if (x.status === 401) {
          navigate("/login"); //TODO: move this 401 check into useAuthContext?
        }
        return x.json();
      })
      .then((t) => {
        setPaintChips(t);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id: string) => {
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
