import {Box, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from '../../../theme/useTheme';
import {HCard, VCard} from '../../../components';

export default function PopularScreen(props: any): React.JSX.Element {
  const {popular} = props.route.params;
  const {colors} = useTheme();

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

  const popularRestaurants = [
    {
      title: 'Ogala',
      description: 'Italian • 15-25 min',
      discount: 20,
      rate: 4.8,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt69ZYdYx_svjbjPgUjsZXwgPiwwZQ_S8_Dg&s',
    },
    {
      title: 'Ogala',
      description: 'Italian • 15-25 min',
      discount: 20,
      rate: 4.8,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt69ZYdYx_svjbjPgUjsZXwgPiwwZQ_S8_Dg&s',
    },
    {
      title: 'Ogala',
      description: 'Italian • 15-25 min',
      discount: 20,
      rate: 4.8,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt69ZYdYx_svjbjPgUjsZXwgPiwwZQ_S8_Dg&s',
    },
  ];

  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1}>
          <Box
            flexWrap="wrap"
            flexDirection="row"
            justifyContent="space-between">
            {popular === 'dishes'
              ? dishes.map((item, index) => (
                  <Box mb={20} key={index}>
                    <VCard
                      title={item.title}
                      description={item.description}
                      rate={item.rate}
                      discount_price={item.discount_price}
                      price={item.price}
                      image={item.image}
                    />
                  </Box>
                ))
              : popularRestaurants.map((restaurant, index) => (
                  <Box mb={20} key={index}>
                    <HCard
                      key={index}
                      title={restaurant.title}
                      description={restaurant.description}
                      discount={restaurant.discount}
                      rate={restaurant.rate}
                      image={restaurant.image}
                    />
                  </Box>
                ))}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}
