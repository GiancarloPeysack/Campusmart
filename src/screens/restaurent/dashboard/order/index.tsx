import {Box, Button, ButtonText, HStack, VStack} from '@gluestack-ui/themed';
import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {useTheme} from '../../../../theme/useTheme';
import {ActiveTab} from './tabs/ActiveTab';
import {PendingTab} from './tabs/PendingTab';
import {CompletedTab} from './tabs/CompletedTab';
import useOrder from './hooks/useOrder';
import {useFocusEffect} from '@react-navigation/native';

const renderScene = SceneMap({
  pending: PendingTab,
  active: ActiveTab,
  completed: CompletedTab,
});

export default function OrderScreen(): React.JSX.Element {
  const {colors} = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const {fetchOrder: getPendings, orders: pendingOrders} = useOrder();
  const {fetchOrder: getActive, orders: activeOrders} = useOrder();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getPendings('pending');
        await getActive('accepted');
      };
      fetchData();
    }, []),
  );

  const routes = useMemo(
    () => [
      {key: 'pending', title: `Pending (${pendingOrders?.length || 0})`},
      {key: 'active', title: `Active (${activeOrders?.length || 0})`},
      {key: 'completed', title: `Completed `},
    ],
    [pendingOrders, activeOrders],
  );

  const renderTabBar = (props: any) => {
    return (
      <HStack p={16}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? '#2563EB' : '#545454';
          const borderColor = index === i ? '#2563EB' : '#ede6e5';

          return (
            <Box
              key={i}
              borderBottomWidth="$2"
              borderColor={borderColor}
              flex={1}>
              <Button
                bg={'transparent'}
                onPress={() => {
                  setIndex(i);
                }}
                size={'sm'}>
                <ButtonText
                  color={color}
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

  return (
    <Box flex={1} bg={colors.white}>
      <TabView
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
