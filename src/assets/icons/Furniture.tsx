import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Furniture = (props: any) => {
  const {color = "#1F2937"} = props;
  
  return (
    <Svg width={20} height={16} fill="none" {...props}>
      <Path d="M0 0h20v16H0V0z" stroke="#E5E7EB" />
      <Path
        d="M2 5a4 4 0 014-4h8a4 4 0 014 4v1.05c-1.14.231-2 1.24-2 2.45V10H4V8.5c0-1.21-.86-2.219-2-2.45V5zm15 3.5c0-.653.419-1.21 1-1.416A1.5 1.5 0 0120 8.5V14c0 .553-.447 1-1 1h-1c-.553 0-1-.447-1-1H3c0 .553-.447 1-1 1H1c-.553 0-1-.447-1-1V8.5a1.5 1.5 0 013 0V11h14V8.5z"
        fill={color}
      />
    </Svg>
  );
}

