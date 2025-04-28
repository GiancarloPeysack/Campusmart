import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Books = (props: any) => {
  const {color = "#1F2937"} = props;

  return (
    <Svg width={14} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_1_1446)">
        <Path
          d="M3 0a3 3 0 00-3 3v10a3 3 0 003 3h10a.999.999 0 100-2v-2c.553 0 1-.447 1-1V1c0-.553-.447-1-1-1H3zm0 12h8v2H3a.999.999 0 110-2zm1-7.5c0-.275.225-.5.5-.5h6c.275 0 .5.225.5.5s-.225.5-.5.5h-6a.501.501 0 01-.5-.5zM4.5 6h6c.275 0 .5.225.5.5s-.225.5-.5.5h-6a.501.501 0 01-.5-.5c0-.275.225-.5.5-.5z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1_1446">
          <Path d="M0 0h14v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

