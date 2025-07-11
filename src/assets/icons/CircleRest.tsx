import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const CircleRest = (props: any) => {
  return (
    <Svg width={80} height={80} fill="none" {...props}>
      <Path
        d="M0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40z"
        fill="#DBEAFE"
      />
      <Path
        d="M0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40z"
        stroke="#E5E7EB"
      />
      <Path d="M23.125 25h33.75v30h-33.75V25z" stroke="#E5E7EB" />
      <Path d="M23.125 25h33.75v30h-33.75V25z" stroke="#E5E7EB" />
      <Path
        d="M55.21 31.082l-3.357-5.314a1.66 1.66 0 00-1.4-.768H29.547a1.66 1.66 0 00-1.4.768l-3.364 5.314c-1.734 2.742-.2 6.557 3.041 6.996.234.03.475.047.709.047 1.53 0 2.889-.668 3.82-1.7a5.137 5.137 0 003.82 1.7c1.53 0 2.89-.668 3.82-1.7a5.137 5.137 0 003.821 1.7 5.127 5.127 0 003.82-1.7 5.147 5.147 0 004.53 1.653c3.252-.434 4.793-4.248 3.053-6.996h-.006zm-2.806 8.853h-.006a7.077 7.077 0 01-3.024-.246V47.5h-18.75v-7.816a6.993 6.993 0 01-3.04.252h-.006a6.763 6.763 0 01-.703-.135V51.25a3.753 3.753 0 003.75 3.75h18.75a3.753 3.753 0 003.75-3.75V39.8a5.595 5.595 0 01-.721.136z"
        fill="#2563EB"
      />
    </Svg>
  );
}

