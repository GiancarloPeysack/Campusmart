import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Message = (props: any) => {
  const { color = "#4B5563" } = props;
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_39_6292)">
        <Path
          d="M2.5 0A2.502 2.502 0 000 2.5v11.25c0 1.379 1.121 2.5 2.5 2.5h3.75v3.125c0 .238.133.453.344.559.21.105.465.082.656-.059l4.832-3.625H17.5c1.379 0 2.5-1.121 2.5-2.5V2.5C20 1.121 18.879 0 17.5 0h-15z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_6292">
          <Path d="M0 0h20v20H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
