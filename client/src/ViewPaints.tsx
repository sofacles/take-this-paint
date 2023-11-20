import { useState, useEffect } from "react";
import { PaintType } from "./types";
import { ImageTile } from "./ImageTile";

function ViewPaints() {
  const [paints, setPaints] = useState<PaintType[]>([]);
  useEffect(() => {
    fetch("/api/paints")
      .then((resp) => resp.json())
      .then((data) => {
        setPaints(data);
      });
  }, []);

  let theTiles = paints?.map((chip) => {
    return <ImageTile key={chip._id} paintUnit={chip} />;
  });
  return (
    <>
      <div className="flex justify-around flex-wrap"> {theTiles}</div>
    </>
  );
}

export default ViewPaints;
