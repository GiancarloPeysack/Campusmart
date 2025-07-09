import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Close = (props: any) => {
    return (
        <Svg width={12} height={16} viewBox="0 0 12 16" fill="none" {...props}>
            <G clipPath="url(#clip0_39_2032)">
                <Path d="M12 16H0V0H12V16Z" stroke="#E5E7EB" />
                <Path
                    d="M10.7063 4.70627C11.0969 4.31565 11.0969 3.68127 10.7063 3.29065C10.3156 2.90002 9.68127 2.90002 9.29065 3.29065L6.00002 6.5844L2.70627 3.29377C2.31565 2.90315 1.68127 2.90315 1.29065 3.29377C0.900024 3.6844 0.900024 4.31877 1.29065 4.7094L4.5844 8.00002L1.29377 11.2938C0.903149 11.6844 0.903149 12.3188 1.29377 12.7094C1.6844 13.1 2.31877 13.1 2.7094 12.7094L6.00002 9.41565L9.29377 12.7063C9.6844 13.0969 10.3188 13.0969 10.7094 12.7063C11.1 12.3156 11.1 11.6813 10.7094 11.2906L7.41565 8.00002L10.7063 4.70627Z"
                    fill="#9CA3AF"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_39_2032">
                    <Rect width={12} height={16} fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};
