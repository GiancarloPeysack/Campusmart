import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Pencil = (props: any) => {
  const {color = "#4B5563"} = props;
  return (
    <Svg width={13} height={12} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_84_170)">
        <Path
          d="M9.47.452L8.334 1.587l3.047 3.047 1.134-1.135a1.5 1.5 0 000-2.12l-.923-.927a1.5 1.5 0 00-2.121 0h-.003zM7.804 2.116L2.342 7.582a2.079 2.079 0 00-.52.877l-.83 2.82a.563.563 0 00.696.7l2.82-.83c.33-.098.632-.276.876-.52l5.468-5.466-3.047-3.047z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_84_170">
          <Path d="M.969 0h12v12h-12V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


