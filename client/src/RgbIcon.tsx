import React from "react";

export type RgbIconPropsType = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const RgbIcon = ({ onClick }: RgbIconPropsType) => {
  let iconStyle = {
    height: "16px",
    enableBackground: "new 0 0 489.6 489.6",
    position: "relative",
    top: "4px",
  };

  const StyleF4AD31 = { fill: "#F4AD31" };
  const StyleE2821A = { fill: "#E2821A" };
  const StyleD32A0F = { fill: "#D32A0F" };
  const StyleB71100 = { fill: "#B71100" };
  const Style0878A0 = { fill: "#0878A0" };
  const Style0C6C8E = { fill: "#0C6C8E" };
  const Style3D3736 = { fill: "#3D3736" };
  const Style0CAA7D = { fill: "#0CAA7D" };
  const Style720D20 = { fill: "#720D20" };
  const Style783089 = { fill: "#783089" };

  return (
    <a
      href="/"
      data-testid="rgbIconLink"
      title="Click to use the color picker!"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <svg
        version="1.1"
        style={iconStyle as React.CSSProperties}
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 489.6 489.6"
        xmlSpace="preserve"
      >
        <path
          style={StyleF4AD31}
          d="M244.8,207.2c25.6-20.8,58.4-32.8,94.4-32.8c19.2,0,37.6,4,55.2,10.4c0.8-6.4,1.6-13.6,1.6-20
                    c0-83.2-67.2-150.4-150.4-150.4S95.2,81.6,95.2,164.8c0,7.2,0.8,13.6,1.6,20c16.8-6.4,35.2-10.4,55.2-10.4
                    C186.4,174.4,219.2,187.2,244.8,207.2z"
        />
        <path
          style={StyleE2821A}
          d="M150.4,174.4c36,0,68,12.8,94.4,32.8c25.6-20.8,58.4-32.8,94.4-32.8c19.2,0,37.6,4,55.2,10.4
                    c0.8-6.4,1.6-13.6,1.6-20c0-83.2-67.2-150.4-150.4-150.4"
        />
        <path
          style={StyleD32A0F}
          d="M188,324.8c0-7.2,0.8-13.6,1.6-20c-49.6-19.2-86.4-64.8-94.4-120C40,207.2,0,260.8,0,324.8
                    C0,408,67.2,475.2,150.4,475.2c36,0,68-12.8,94.4-32.8C210.4,414.4,188,372,188,324.8z"
        />
        <path
          style={StyleB71100}
          d="M150.4,475.2c36,0,68-12.8,94.4-32.8c-34.4-27.2-56.8-69.6-56.8-117.6c0-7.2,0.8-13.6,1.6-20"
        />
        <path
          style={Style0878A0}
          d="M393.6,184.8c-7.2,55.2-44,100-94.4,120c0.8,6.4,1.6,13.6,1.6,20c0,47.2-22.4,89.6-56.8,117.6
                    c25.6,20.8,58.4,32.8,94.4,32.8c83.2,0,150.4-67.2,150.4-150.4C489.6,260.8,449.6,207.2,393.6,184.8z"
        />
        <path
          style={Style0C6C8E}
          d="M244.8,442.4c25.6,20.8,58.4,32.8,94.4,32.8c83.2,0,150.4-67.2,150.4-150.4"
        />
        <path
          style={Style3D3736}
          d="M244.8,207.2c-29.6,23.2-49.6,57.6-55.2,96.8c16.8,6.4,35.2,10.4,55.2,10.4c19.2,0,37.6-4,55.2-10.4
                    C294.4,265.6,274.4,231.2,244.8,207.2z"
        />
        <path d="M244.8,315.2c19.2,0,37.6-4,55.2-10.4c-5.6-39.2-25.6-73.6-55.2-96.8" />
        <path
          style={Style0CAA7D}
          d="M300,304.8c49.6-19.2,86.4-64.8,94.4-120c-16.8-6.4-35.2-10.4-55.2-10.4c-35.2,0-68,12.8-94.4,32.8
                    C274.4,231.2,294.4,265.6,300,304.8z"
        />
        <path
          style={Style720D20}
          d="M244.8,207.2c-25.6-20.8-58.4-32.8-94.4-32.8c-19.2,0-37.6,4-55.2,10.4c7.2,55.2,44,100,94.4,120
                    C195.2,265.6,215.2,231.2,244.8,207.2z"
        />
        <path
          style={Style783089}
          d="M301.6,324.8c0-7.2-0.8-13.6-1.6-20c-16.8,6.4-35.2,10.4-55.2,10.4c-19.2,0-37.6-4-55.2-10.4
                    c-0.8,6.4-1.6,13.6-1.6,20c0,47.2,22.4,89.6,56.8,117.6C279.2,414.4,301.6,372,301.6,324.8z"
        />
      </svg>
    </a>
  );
};

export { RgbIcon };