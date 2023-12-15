import { useRef } from "react";
import BTD from "./BorderedTableCell";
import { PaintTileProps } from "../types";

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
      <BTD>{paintUnit.name}</BTD>

      <BTD>
        {paintUnit.imageName ? (
          <img alt="paint color" style={imgStyle} src={paintUnit.imageName} />
        ) : (
          <div style={rgbStyle} />
        )}
      </BTD>
      <BTD title={paintUnit.emailRef}>{`...${paintUnit.emailRef.slice(
        -6
      )}`}</BTD>
      <BTD>
        email confirmed?
        <input
          className="ml-2"
          type="checkbox"
          ref={emailConfirmedRef}
          defaultChecked={paintUnit.emailConfirmed}
          onChange={updateEmailConfirmed}
        />
      </BTD>
      <BTD>
        <button
          className="bg-emerald-400 border-2 rounded-md p-1  hover:border-red-500"
          onClick={deletePaint}
        >
          delete
        </button>
      </BTD>
    </tr>
  );
};
