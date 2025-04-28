import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const MapTag = (props:any) => {
  const {color = "#9CA3AF"} = props;
  return (
    <Svg width={11} height={14} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_39_1994)">
        <Path
          d="M5.898 13.65c1.403-1.755 4.602-6.01 4.602-8.4A5.251 5.251 0 005.25 0 5.251 5.251 0 000 5.25c0 2.39 3.2 6.645 4.602 8.4a.826.826 0 001.296 0zM5.25 3.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5z"
          fill= {color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_1994">
          <Path d="M0 0h10.5v14H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

