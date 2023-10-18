import React from "react";
import { PaintTileProps } from "../types";

interface AdminPaintTypeType extends PaintTileProps {
  onDelete: (id: string) => void;
}

export const PaintCan = ({ paintUnit, onDelete }: AdminPaintTypeType) => {
  const imgStyle = {
    height: "90%",
  };

  const rgbStyle = {
    backgroundColor: `#${paintUnit.rgb}`,
    height: "30px",
    width: "160px",
  };

  const deletePaint = () => {
    fetch(`/api/admin/paints?id=${paintUnit._id}`, { method: "DELETE" })
      .then((x) => {
        return x.json();
      })
      .then((resp) => {
        if (resp.data.result === "success") {
          onDelete(paintUnit._id);
        }
      });
  };

  return (
    <tr>
      <td>{paintUnit.name}</td>

      <td style={imgStyle}>
        {paintUnit.imageName ? (
          <img
            alt="paint color"
            style={imgStyle}
            src={`uploads/resized/${paintUnit.imageName}`}
          />
        ) : (
          <div style={rgbStyle} />
        )}
      </td>
      <td>
        <button onClick={deletePaint}>delete</button>
      </td>
    </tr>
  );
};
