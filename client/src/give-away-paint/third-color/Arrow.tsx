export type ArrowButtonProps = {
  direction: "up" | "down";
  text: string;
};
const ArrowButton = ({ direction = "up", text }: ArrowButtonProps) => {
  let rotation = 180.1;
  if (direction === "up") {
    rotation = 0.1;
  }
  // Adding .1 to rotation to workaround Safari rotation bug:  https://stackoverflow.com/questions/40363916/svg-transform-rotate-by-90-180-or-270-degrees-not-working-on-circle-in-safari-i
  return (
    <button type="button">
      <svg
        height="50"
        width="30"
        style={{ display: "inline" }}
        viewBox="65, 100, 350, 400"
        transform={`rotate(${rotation})`}
      >
        <polygon
          points="250,60 100,400 400,400"
          className="triangle"
          fill="#00F"
        />
        <text
          x={direction === "up" ? 170 : 190}
          y={350}
          fill="yellow"
          className="small-svg"
        >
          {text}
        </text>
        Sorry, your browser does not support inline SVG.
      </svg>
    </button>
  );
};

export default ArrowButton;
