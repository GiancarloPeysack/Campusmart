import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Call = (props: any) => {
  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <Path
        d="M5.153.769A1.246 1.246 0 003.672.044l-2.75.75C.378.944 0 1.437 0 2c0 7.731 6.269 14 14 14 .563 0 1.056-.378 1.206-.922l.75-2.75a1.246 1.246 0 00-.725-1.481l-3-1.25a1.246 1.246 0 00-1.447.362L9.522 11.5A10.562 10.562 0 014.5 6.478l1.54-1.26c.429-.35.576-.937.363-1.446l-1.25-3V.769z"
        fill="#9CA3AF"
      />
    </Svg>
  );
}

