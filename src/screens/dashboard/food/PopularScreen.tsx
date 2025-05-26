import {Box, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from '../../../theme/useTheme';
import {HCard, VCard} from '../../../components';
import useRestaurents from '../../../hooks/public/useRestaurents';
import useMenus from '../../../hooks/public/useMenus';
import {navigate} from '../../../navigators/Root';

export default function PopularScreen(props: any): React.JSX.Element {
  const {popular} = props.route.params;
  const {colors} = useTheme();

  const {restaurents, isLoading} = useRestaurents();
  const {menus, isLoading: fetchingMenus} = useMenus();

  const dishes = [
    {
      title: 'Margherita Pizza',
      description: 'The Italian Corner',
      rate: 4.8,
      discount_price: '€10.99',
      price: '€12.99',
      image:
        'https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg',
    },
    {
      title: 'Margherita Pizza',
      description: 'The Italian Corner',
      rate: 4.8,
      discount_price: '€10.99',
      price: '€12.99',
      image:
        'https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg',
    },
    {
      title: 'Margherita Pizza',
      description: 'The Italian Corner',
      rate: 4.8,
      discount_price: '€10.99',
      price: '€12.99',
      image:
        'https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg',
    },
  ];

  if (isLoading) {
    return (
      <Box flex={1} p={16} bg={colors.white}>
        <Text fontSize={14} fontWeight="$light">
          Fetching data...
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1}>
          <Box
            flexWrap="wrap"
            flexDirection="row"
            justifyContent="space-between">
            {popular === 'dishes'
              ? menus.map((item: any, index: number) => (
                  <Box mb={20} key={index}>
                    <VCard
                      title={item.itemName}
                      description={item.description}
                      rate={5}
                      discount_price={item.price}
                      price={item.price}
                      image={item.image}
                      onPress={() =>
                        navigate('Dish', {title: 'Dish Details', id: item.id})
                      }
                    />
                  </Box>
                ))
              : restaurents?.map((restaurant: any, index: number) => (
                  <Box mb={20} key={index}>
                    <HCard
                      title={restaurant.nameOfRestaurent}
                      description={restaurant.bio}
                      discount={restaurant.discount}
                      image={restaurant.coverImage}
                      onPress={() =>
                        navigate('Restaurant', {
                          title: 'Resturent Details',
                          id: restaurant.id,
                        })
                      }
                    />
                  </Box>
                ))}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}
