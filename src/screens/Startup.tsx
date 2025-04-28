import {Box, Center, Text} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {useTheme} from '../theme/useTheme';
import {navigate} from '../navigators/Root';
import useAuth from '../hooks/useAuth';

export default function Startup(): React.JSX.Element {
  const {colors} = useTheme();

  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate('onboarding');
      }, 3000);
    }
  }, []);

  return (
    <Box flex={1} bg={colors.background}>
      <Center flex={1}>
        <Text
          textAlign="center"
          color="$black"
          fontWeight="$semibold"
          fontSize={18}
          textTransform="uppercase">
          University Marketplace
        </Text>
      </Center>
    </Box>
  );
}
