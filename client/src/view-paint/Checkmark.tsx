const Checkmark = () => {
  let sideLength = "16px";

  return (
    <svg
      className="inline"
      enableBackground="new 0 0 510 510"
      fill="rgb(110,231,183)"
      height={sideLength}
      viewBox="0 0 512 512"
      width={sideLength}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M187.5,447.7c-8.8,0-17.3-3.7-23.3-10.2L9.1,272.5c-12.1-12.9-11.4-33.1,1.4-45.2
		c12.9-12.1,33.1-11.4,45.2,1.4l131.5,140.1L455.6,75.3c11-13.7,31.1-15.9,44.9-4.9c13.7,11,15.9,31.1,4.9,44.9l-2.5,2.8
		L211.1,437.2c-6,6.6-14.4,10.4-23.3,10.5H187.5z"
        />
      </g>
    </svg>
  );
};

export default Checkmark;
