import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Search = (props: any) => {
  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_413_172)">
        <Path
          d="M13 6.5c0 1.434-.466 2.76-1.25 3.834l3.956 3.96a1.002 1.002 0 01-1.415 1.415l-3.957-3.959A6.463 6.463 0 016.5 13C2.91 13 0 10.09 0 6.5S2.91 0 6.5 0 13 2.91 13 6.5zM6.5 11a4.5 4.5 0 100-9.002A4.5 4.5 0 006.5 11z"
          fill="#374151"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_413_172">
          <Path d="M0 0h16v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


