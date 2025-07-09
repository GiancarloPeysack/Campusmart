import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useTheme } from '../../../theme/useTheme';
import { FlatList, ScrollView } from 'react-native';
import { Icons } from '../../../assets/icons';
import { HCard, VCard } from '../../../components';
import { navigate } from '../../../navigators/Root';
import useRestaurents from '../../../hooks/public/useRestaurents';
import useMenus from '../../../hooks/public/useMenus';

export default function FoodScreen(): React.JSX.Element {
  const { colors } = useTheme();

  const { restaurents, isLoading } = useRestaurents();

  const { menus, isLoading: fetchingMenus } = useMenus();

  if (isLoading || fetchingMenus) {
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack p={16} flex={1} gap={20}>
          <Box bg={colors.light_blue} h={100} rounded={12} px={16} py={18}>
            <Text color={colors.blue} fontWeight="$bold">
              Student Discount
            </Text>
            <HStack mt={10} justifyContent="space-between">
              <Text color={colors.blue1} fontWeight="$light" fontSize={14}>
                All students keep 20% with all {'\n'}restaurants.
              </Text>
              <Icons.Hat />
            </HStack>
          </Box>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="$black" fontWeight="$bold" fontSize={20}>
              Popular Restaurants
            </Text>
            <Button
              onPress={() =>
                navigate('Popular', {
                  popular: 'restaurants',
                })
              }
              $active-opacity={0.8}
              bg={'transparent'}
              rounded="$full">
              <ButtonText
                fontWeight="$semibold"
                fontSize={16}
                color={colors.primary}>
                View All
              </ButtonText>
            </Button>
          </HStack>
          <Box>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack gap={20}>
                {restaurents.map((restaurant: any, index: number) => {
                  return (
                    <HCard
                      key={index}
                      title={restaurant.nameOfRestaurent}
                      description={restaurant.bio}
                      discount={restaurant.discount}
                      image={restaurant.coverImage}
                      fullWidth
                      onPress={() =>
                        navigate('Restaurant', {
                          title: 'Resturent Details',
                          id: restaurant.id,
                        })
                      }
                    />
                  );
                })}
              </HStack>
            </ScrollView>
          </Box>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="$black" fontWeight="$bold" fontSize={20}>
              Popular Dishes
            </Text>
            <Button
              onPress={() =>
                navigate('Popular', {
                  popular: 'dishes',
                })
              }
              $active-opacity={0.8}
              bg={colors.light_blue}
              rounded="$full">
              <ButtonText
                fontWeight="$semibold"
                fontSize={16}
                color={colors.primary}>
                View All
              </ButtonText>
            </Button>
          </HStack>
          <Box
            flexWrap="wrap"
            flexDirection="row"
            justifyContent="space-between">
            {menus.map((item: any, index: number) => (
              <Box mb={20} key={index}>
                <VCard
                  title={item.itemName}
                  description={item.description}
                  rate={4.3}
                  isFullWidth={true}
                  discount_price={item.price}
                  price={item.price}
                  image={item.image}
                  onPress={() =>
                    navigate('Dish', { title: 'Dish Details', id: item.id })
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
