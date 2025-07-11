import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Sports = (props: any) => {
  const {color = "#1F2937"} = props;

  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_1_1452)">
        <Path
          d="M2.706 2L5.37 4.662A4.95 4.95 0 006.5 1.5c0-.46-.063-.903-.178-1.325A8.031 8.031 0 002.706 2zM2 2.706A8.031 8.031 0 00.175 6.322a5.004 5.004 0 004.49-.95L2 2.706zM8 0c-.228 0-.456.01-.681.028C7.438.5 7.5.994 7.5 1.5a5.981 5.981 0 01-1.419 3.875L8 7.294 13.294 2A7.986 7.986 0 008 0zM1.5 7.5c-.506 0-1-.063-1.472-.181A7.986 7.986 0 002 13.294L7.294 8 5.375 6.081A5.981 5.981 0 011.5 7.5zm14.472 1.181A7.986 7.986 0 0014 2.706L8.706 8l1.919 1.919A5.975 5.975 0 0114.5 8.5c.506 0 1 .063 1.472.181zm-.147.997a5.003 5.003 0 00-4.49.95L14 13.294a7.968 7.968 0 001.825-3.616zm-5.197 1.656a5.003 5.003 0 00-.95 4.49 8.031 8.031 0 003.616-1.824l-2.663-2.662-.003-.004zm-.71-.709L8 8.706 2.706 14a7.974 7.974 0 005.975 1.972A6.028 6.028 0 018.5 14.5c0-1.478.534-2.828 1.419-3.875z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1_1452">
          <Path d="M0 0h16v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

