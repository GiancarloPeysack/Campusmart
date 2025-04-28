import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Heart = (props: any) => {
  const {color = "#9CA3AF"} = props;
  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <Path d="M0 0h16v16H0V0z" stroke="#E5E7EB" />
      <Path
        d="M1.488 9.388l5.646 5.271a1.269 1.269 0 001.732 0l5.646-5.271A4.675 4.675 0 0016 5.966v-.182a4.466 4.466 0 00-7.625-3.159L8 3l-.375-.375A4.468 4.468 0 000 5.785v.18c0 1.298.537 2.538 1.488 3.423z"
        fill={color}
      />
    </Svg>
  );
}

