import { PaintTileProps } from "../types";
import { useRef } from "react";

interface AdminPaintTypeType extends PaintTileProps {
  onDelete: (id: string) => void;
}

export const PaintCan = ({ paintUnit, onDelete }: AdminPaintTypeType) => {
  const emailConfirmedRef = useRef<HTMLInputElement>(null);
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

  const updateEmailConfirmed = () => {
    fetch("/api/admin/paints", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailConfirmed: emailConfirmedRef.current?.checked,
        _id: paintUnit._id,
      }),
    }).then((x) => {
      if (x.status === 204) {
        return true;
      }
      return false;
    });
  };

  return (
    <tr>
      <td>{paintUnit.name}</td>

      <td style={imgStyle}>
        {paintUnit.imageName ? (
          <img alt="paint color" style={imgStyle} src={paintUnit.imageName} />
        ) : (
          <div style={rgbStyle} />
        )}
      </td>
      <td>
        email confirmed?
        <input
          type="checkbox"
          ref={emailConfirmedRef}
          defaultChecked={paintUnit.emailConfirmed}
          onChange={updateEmailConfirmed}
        />
      </td>
      <td>
        <button onClick={deletePaint}>delete</button>
      </td>
    </tr>
  );
};
