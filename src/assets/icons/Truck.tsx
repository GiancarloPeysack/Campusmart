import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Truck = (props: any) => {
  const {color = '#9CA3AF' } = props;

  return (
    <Svg width={30} height={24} fill="none" {...props}>
      <Path
        d="M2.25 0A2.25 2.25 0 000 2.25v15a2.25 2.25 0 002.25 2.25H3a4.501 4.501 0 009 0h6a4.501 4.501 0 009 0h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5v-5.377c0-.796-.314-1.56-.877-2.123L24 5.377a3.001 3.001 0 00-2.123-.877H19.5V2.25A2.25 2.25 0 0017.25 0h-15zM19.5 7.5h2.377l3.623 3.623V12h-6V7.5zm-14.25 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm17.25-2.25a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
        fill={color}
      />
    </Svg>
  );
}

