import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Card = ({
  color = "#2563EB",
  width = 24,
  height = 24,
  ...props
}: {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
      <Path
        d="M2 1C.897 1 0 1.897 0 3v1h18V3c0-1.103-.897-2-2-2H2zm16 6H0v6c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V7zM3.5 11h2c.275 0 .5.225.5.5s-.225.5-.5.5h-2a.501.501 0 01-.5-.5c0-.275.225-.5.5-.5zm3.5.5c0-.275.225-.5.5-.5h4c.275 0 .5.225.5.5s-.225.5-.5.5h-4a.501.501 0 01-.5-.5z"
        fill={color}
      />
    </Svg>
  );
};
