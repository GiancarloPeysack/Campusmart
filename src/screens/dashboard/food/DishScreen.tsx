import React, {useEffect, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  HStack,
  Icon,
  Image,
  Pressable,
  RemoveIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import {SelectedButton} from '../../../components';
import useMenus from '../../../hooks/public/useMenus';
import useRestaurents from '../../../hooks/public/useRestaurents';
import {useCart} from '../../../context/cart';

interface MenuItem {
  availability: boolean;
  category: string;
  id: string;
  image: string;
  itemName: string;
  price: string;
  userId: string;
  description: string;
  extraOptions?: {
    id: string;
    name: string;
    description: string;
    price: string;
  }[];
}

interface Restaurant {
  id: string;
  nameOfRestaurent: string;
  discount: number;
  coverImage: string;
  deliveryCharge: number;
  bio: string;
}

export default function DishScreen(props: any): React.JSX.Element {
  const {colors} = useTheme();

  const [menuItem, setMenuItem] = useState<MenuItem | null>();
  const [restaurant, setRestaurent] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState(1);

  const {addToCart} = useCart();

  const {id} = props.route.params;

  const {fetchMenuByMenuId, isLoading} = useMenus();
  const {fetchRestaurantById} = useRestaurents();

  const sizes = ['Regular', 'Large (+$2)'];

  const extraOptions = [
    'Extra Cheese (+$1)',
    'Bacon (+$2)',
    'Avocado (+$1.5)',
    'Fried Egg (+$1)',
  ];

  useEffect(() => {
    if (id) {
      const fecthData = async () => {
        const data = await fetchMenuByMenuId(id);
        const restData = await fetchRestaurantById(data?.userId);
        setMenuItem(data as MenuItem);
        setRestaurent(restData as Restaurant);
      };

      fecthData();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (menuItem) {
      addToCart({
        id: menuItem.id,
        itemName: menuItem.itemName,
        price: menuItem.price,
        quantity,
        image: menuItem.image,
        restaurantId: restaurant?.id,
      });

      Alert.alert('Success', 'Item added to cart')
    }
  };

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
        <Image
          source={{
            uri: menuItem?.image,
          }}
          resizeMode="cover"
          h={280}
          w="100%"
          alt="card-image"
        />
        <VStack gap={16} p={16}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize={20} flex={1} fontWeight="$bold" color="$black">
              {menuItem?.itemName}
            </Text>
            <Text fontSize={20} fontWeight="$bold" color={colors.primary}>
              ${menuItem?.price}
            </Text>
          </HStack>
          <HStack alignItems="center" gap={5}>
            <Text fontSize={14} color={colors.gray5}>
              By {restaurant?.nameOfRestaurent}
            </Text>
            <Icons.Dot color="#D1D5DB" />
            <Text fontSize={14} color={colors.gray5}>
              Popular Choice
            </Text>
          </HStack>

          <Text fontSize={16} mt={4} color={colors.title}>
            {menuItem?.description}
          </Text>
          <Text fontSize={16} mt={4} fontWeight="$semibold" color="$black">
            Choose Size
          </Text>
          <HStack justifyContent="space-between">
            {sizes.map((item, key) => {
              return <SelectedButton key={key} text={item} />;
            })}
          </HStack>
          {menuItem?.extraOptions && menuItem.extraOptions.length > 0 && (
            <VStack gap={16}>
              <Text fontSize={16} mt={4} fontWeight="$semibold" color="$black">
                Extra Options
              </Text>
              <HStack justifyContent="space-between" flexWrap="wrap">
                {menuItem.extraOptions.map((item, key) => {
                  return (
                    <Box key={key} mb={12}>
                      <SelectedButton text={`${item.name} (+$${item.price})`} />
                    </Box>
                  );
                })}
              </HStack>
            </VStack>
          )}
        </VStack>
      </ScrollView>
      <HStack
        p={16}
        borderTopColor={colors.gray1}
        borderTopWidth={1}
        gap={10}
        justifyContent="space-between">
        {/* <HStack
          alignItems="center"
          w={128}
          borderColor={colors.gray1}
          borderWidth={1}
          h={60}
          rounded={12}
          justifyContent="space-around">
           <Pressable p={5} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Icon as={RemoveIcon} color={colors.primary} />
          </Pressable>
          <Text color="$black" fontWeight="$semibold">
            {quantity}
          </Text>
          <Pressable p={5} onPress={() => setQuantity(quantity + 1)}>
            <Icon as={AddIcon} color={colors.primary} />
          </Pressable>
        </HStack> */}
        <Button
          h={60}
          flexGrow={1}
          rounded={12}
          onPress={handleAddToCart}
          variant="outline"
          borderColor={colors.primary}>
          <ButtonText color={colors.primary} fontSize={16}>
            Add to Cart
          </ButtonText>
        </Button>
        <Button h={60}  w='$1/3' rounded={12} bg={colors.primary}>
          <ButtonText fontSize={16}>Buy Now</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}
