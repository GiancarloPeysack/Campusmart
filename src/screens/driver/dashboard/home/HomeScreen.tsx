import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  HStack,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {useTheme} from '../../../../theme/useTheme';
import {ConfirmedTab} from './tabs/ConfirmedTab';
import {DeliveredTab} from './tabs/DeliveredTab';
import {NewTab} from './tabs/NewTab';
import {Icons} from '../../../../assets/icons';
import useAuth from '../../../../hooks/useAuth';

const renderScene = SceneMap({
  new: NewTab,
  confirmed: ConfirmedTab,
  delivered: DeliveredTab,
});

const routes = [
  {key: 'new', title: 'New'},
  {key: 'confirmed', title: 'Confirmed'},
  {key: 'delivered', title: 'Delivered'},
];

export default function HomeScreen(): React.JSX.Element {
  const {colors} = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (props: any) => {
    return (
      <HStack p={16}>
        {props.navigationState.routes.map((route: any, i: any) => {
          let color = '#2563EB';
          let borderColor = '#2563EB';

          switch (route.key) {
            case 'new':
              color = '#DC2626';
              borderColor = '#DC2626';
              break;
            case 'confirmed':
              color = '#2563EB';
              borderColor = '#2563EB';
              break;
            case 'delivered':
              color = '#059669';
              borderColor = '#059669';
              break;
          }

          const isSelected = index === i;
          const bg = isSelected ? color : '#fff';
          const fontColor = isSelected ? '#fff' : color;

          return (
            <Box
              key={i}
              borderWidth="$2"
              rounded={8}
              marginHorizontal={3}
              borderColor={borderColor}
              backgroundColor={bg}
              flex={1}>
              <Button
                bg={'transparent'}
                onPress={() => {
                  setIndex(i);
                }}
                size={'sm'}>
                <ButtonText
                  color={fontColor}
                  fontFamily="Poppins"
                  fontWeight={index === i ? '$medium' : '$normal'}>
                  {route.title}
                </ButtonText>
              </Button>
            </Box>
          );
        })}
      </HStack>
    );
  };

  const {user} = useAuth();


  return (
    <Box flex={1} bg={colors.white}>
      <HStack
        px={12}
        py={10}
        justifyContent="space-between"
        alignItems="center">
        <HStack space="md" alignItems="center">
          <Box bg="#DBEAFE" w={32} h={32} rounded="$full">
            <Center flex={1}>
              <Icons.SmallBike />
            </Center>
           
          </Box>
          <VStack>
            <Text fontSize={14} fontWeight="$semibold">
              {user?.firstName}
            </Text>
            <HStack alignItems='center' space='sm'>
                 <Box w={6} h={6} rounded='$full' bg='$green400' />
            <Text fontSize={14}>Online</Text>
            </HStack>
          </VStack>
        </HStack>
        <SettingsIcon />
      </HStack>
      <TabView
        style={{backgroundColor: colors.newBg}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        swipeEnabled={false}
        renderTabBar={renderTabBar}
      />
    </Box>
  );
}
