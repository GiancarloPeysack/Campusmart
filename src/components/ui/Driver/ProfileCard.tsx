import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import {Icons} from '../../../assets/icons';
import {useTheme} from '../../../theme/useTheme';

type Props  = {
    label?: string;
    value? :string;
    icon?: any
}

export const ProfileCard = ({label, value, icon}: Props) => {
  const {colors} = useTheme();

  return (
    <Box
    p={16}
      bg="$white"
      borderRadius={8}
      w="$full"
      shadowColor="#E5E7EB"
      shadowOpacity={0.8}
      shadowRadius={2}
      shadowOffset={{width: 0, height: 1}}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space="md" alignItems="center">
          {icon}
          <VStack space="sm">
            <Text color={colors.title}>{label}</Text>
            <Text color="#000" fontWeight="$medium">
              {value}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};
