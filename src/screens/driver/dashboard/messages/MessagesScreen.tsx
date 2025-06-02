import { Box, Text } from "@gluestack-ui/themed";
import { useTheme } from "../../../../theme/useTheme";

 export default function MessagesScreen(){
    const {colors} = useTheme();

    return(
            <Box flex={1} bg={colors.white}>
                <Text>
                    Home
                </Text>

            </Box>
    )
}