import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Camara = (props: any) => {
  const { fill = "#60A5FA" } = props;

  return (
    <Svg width={props?.w ? props?.w : 48} height={props?.h ? props?.h : 42} fill="none" viewBox="0 0 48 42" {...props}>
      <Path
        d="M13.978 3.075L13.003 6H6c-3.31 0-6 2.69-6 6v24c0 3.31 2.69 6 6 6h36c3.31 0 6-2.69 6-6V12c0-3.31-2.69-6-6-6h-7.003l-.975-2.925A4.488 4.488 0 0029.756 0H18.244a4.488 4.488 0 00-4.266 3.075zM24 15a9 9 0 110 18 9 9 0 010-18z"
        fill={fill}
      />
    </Svg>
  );
}

