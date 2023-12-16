import { useState, useEffect } from "react";
import { PaintType, ZipCodeFieldsType } from "../types";
import ZipCode from "./ZipCode";
import { ImageTile } from "./ImageTile";

function ViewPaints() {
  const [paints, setPaints] = useState<PaintType[]>([]);
  const zipCodeCookie = document.cookie
    .split(";")
    .find((x) => x.includes("zipCode"));

  const [zipObj, setZipObj] = useState<ZipCodeFieldsType>({
    zipCode: zipCodeCookie?.split("=")[1] || "",
    milesFrom: 20,
  });

  useEffect(() => {
    document.cookie = `zipCode=${zipObj.zipCode}`;
    fetch(`/api/paints?zipCode=${zipObj.zipCode}&milesFrom=${zipObj.milesFrom}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPaints(data);
      });
  }, [zipObj.milesFrom, zipObj.zipCode]);

  const handleZipCodeChange = (distance: number, zip: string) => {
    setZipObj({ milesFrom: distance, zipCode: zip });
  };

  let theTiles = paints?.map((chip) => {
    return <ImageTile key={chip._id} paintUnit={chip} />;
  });
  return (
    <>
      <ZipCode onUpdated={handleZipCodeChange} value={zipObj} />

      <div className="flex justify-around flex-wrap"> {theTiles}</div>
    </>
  );
}

export default ViewPaints;
