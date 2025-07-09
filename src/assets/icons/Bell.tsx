import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Bell = (props: any) => {
  return (
    <Svg width={props.width ?? 14} height={props?.height ?? 16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_413_182)">
        <Path
          d="M7 0c-.553 0-1 .447-1 1v.6a5.002 5.002 0 00-4 4.9v.588c0 1.468-.54 2.887-1.515 3.987l-.231.26A.998.998 0 001 13h12a1.002 1.002 0 00.746-1.667l-.231-.259A6.008 6.008 0 0112 7.088V6.5a5.002 5.002 0 00-4-4.9V1c0-.553-.447-1-1-1zm1.416 15.416A2 2 0 009 14H5a2 2 0 00.585 1.416A2 2 0 007 16a2 2 0 001.416-.584z"
          fill={props.color ?? "#374151"}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_413_182">
          <Path d="M0 0h14v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}