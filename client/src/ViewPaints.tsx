import { useState, useEffect } from "react";

function ViewPaints() {
  const [paints, setPaints] = useState("unknown");
  useEffect(() => {
    fetch("/api/paints")
      .then((resp) => resp.json())
      .then((data) => {
        setPaints(JSON.stringify(data));
      });
  }, []);

  return (
    <>
      <p> {paints}</p>
    </>
  );
}

export default ViewPaints;
