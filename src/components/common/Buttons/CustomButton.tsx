import { HStack, Pressable, Spinner, Text } from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '../../../theme/useTheme';

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  isLoading?: boolean;
};

export const CustomButton = (props: CustomButtonProps) => {
  const { colors } = useTheme();

  return (
    <Pressable $active-opacity={0.8} overflow="hidden" rounded={12} onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.gradientDark, colors.gradientDark2]}
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HStack alignItems="center" gap={5}>
          <Text fontSize={16} fontWeight='$medium' color={colors.white}>
            {props.isLoading ? 'Please wait...' : props.text}
          </Text>
          {props.isLoading ? <Spinner color={colors.white} /> : props.icon}
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};
