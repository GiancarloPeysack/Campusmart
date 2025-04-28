import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const House = (props: any) => {
  const {color = "#1F2937"} = props;
  
  return (
    <Svg width={18} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_1_1440)">
        <Path
          d="M17.994 7.984a1.01 1.01 0 01-1 1.004h-1l.022 5.006c0 .084-.007.168-.016.253v.503c0 .69-.56 1.25-1.25 1.25h-.5c-.034 0-.069 0-.103-.003-.044.003-.088.003-.131.003H12.25c-.69 0-1.25-.56-1.25-1.25V12c0-.553-.447-1-1-1H8c-.553 0-1 .447-1 1v2.75C7 15.44 6.44 16 5.75 16H4.003c-.047 0-.094-.003-.14-.006A1.325 1.325 0 013.75 16h-.5C2.56 16 2 15.44 2 14.75v-3.5c0-.028 0-.06.003-.088V8.988H1c-.563 0-1-.437-1-1.003 0-.28.094-.53.313-.75L8.325.25c.219-.219.469-.25.688-.25.218 0 .468.063.656.219l7.981 7.015c.25.22.375.47.344.75z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1_1440">
          <Path d="M0 0h18v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
