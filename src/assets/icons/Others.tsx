import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const  Others = (props: any)  => {
  const {color = "#1F2937"} = props;

  return (
    <Svg width={14} height={4} fill="none" {...props}>
      <Path
        d="M.25 2a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zm5 0a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zM12 .25a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5z"
        fill={color}
      />
    </Svg>
  );
}


