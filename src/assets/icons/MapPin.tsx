import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const MapPin = (props: any) => {
  const {fill="#9CA3AF"} = props;
  return (
    <Svg width={12} height={16} fill="none" {...props}>
      <Path
        d="M6.74 15.6C8.345 13.594 12 8.731 12 6c0-3.313-2.688-6-6-6-3.313 0-6 2.688-6 6 0 2.731 3.656 7.594 5.26 9.6a.944.944 0 001.48 0zM6 4a2 2 0 110 4 2 2 0 010-4z"
        fill={fill}
      />
    </Svg>
  );
}

