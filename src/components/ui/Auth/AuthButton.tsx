import {Center, HStack, Pressable, Text} from '@gluestack-ui/themed';

import {useTheme} from '../../../theme/useTheme';

type CustomButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
};

export const AuthButton = (props: CustomButtonProps) => {
  const {colors} = useTheme();

  return (
    <Pressable h={60} bg={colors.white} $active-opacity={0.8} overflow="hidden" rounded={12} borderWidth={1} borderColor='#E5E5E5'>
        <Center flex={1}>
            <HStack gap={12}>
                {props.icon}
                <Text fontWeight='$medium'>{props.text}</Text>
            </HStack>
        </Center>
    </Pressable>
  );
};
