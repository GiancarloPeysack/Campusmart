import { Box } from "@gluestack-ui/themed";
import { useTheme } from "../../../../../theme/useTheme";

export default function AssignDriverScreen(){
    const { colors } = useTheme();

    return(
        <Box flex={1} bg={colors.newBg}>

        </Box>
    )
}