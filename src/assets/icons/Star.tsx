import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Star = (props: any) => {
  return (
    <Svg
      width={props.size || 18}
      height={props.size || 18}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 2L14.9 8.63L22 9.24L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.24L9.1 8.63L12 2Z"
        fill={props.color || "#FFD700"}
      />
    </Svg>
  );
};
