import React, { useEffect, useState, useRef } from 'react';
import { Alert, ScrollView, Image, View, Pressable, ActivityIndicator } from 'react-native';
import {
  AddIcon,
  ArrowLeftIcon,
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { SelectedButton } from '../../../components';
import useMenus from '../../../hooks/public/useMenus';
import useRestaurents from '../../../hooks/public/useRestaurents';
import { useCart } from '../../../context/cart';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import CartModal from '../../../components/ui/Cart/CartModal';

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
  image: string;
  deliveryCharge: number;
  bio: string;
}

export default function DishScreen(props: any): React.JSX.Element {
  const { colors } = useTheme();
  const bottomSheetRef = useRef();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [menuItem, setMenuItem] = useState<MenuItem | null>();
  const [restaurant, setRestaurent] = useState<Restaurant | null>(null);
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [qty, setQty] = useState(1);

  const onIncrement = () => setQty(prev => prev + 1);

  const onDecrement = () => {
    if (qty > 1) setQty(prev => prev - 1);
  };

  const { addToCart } = useCart();

  const { id } = props.route.params;

  const { fetchMenuByMenuId, isLoading } = useMenus();
  const { fetchRestaurantById } = useRestaurents();

  const sizes = ['Regular', 'Large (+$2)'];

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
    setLoading(true);

    if (!restaurant?.stripeAccountId) {
      Alert.alert('Erorr', 'Resturant Bank Information is not set up');
      return;
    }
    if (menuItem) {
      addToCart({
        id: menuItem.id,
        itemName: menuItem.itemName,
        price: parseFloat(menuItem.price),
        quantity: qty,
        image: menuItem.image,
        restaurantId: restaurant?.id,
      });

      setTimeout(() => {
        setLoading(false);
        bottomSheetRef.current.open();
      }, 3000);

      // Alert.alert('Success', 'Item added to cart')
    }
  };

  const handleBuyNow = () => {
    if (!restaurant?.stripeAccountId) {
      Alert.alert('Erorr', 'Resturant Bank Information is not set up');
      return;
    }

    if (menuItem) {
      addToCart({
        id: menuItem.id,
        itemName: menuItem.itemName,
        price: parseFloat(menuItem.price),
        quantity: qty,
        image: menuItem.image,
        restaurantId: restaurant?.id,
      });

      props.navigation.navigate('Cart');
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
      {loading && <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff40',
          position: 'absolute',
          zIndex: 9999999,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingTop: 120
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000040',
            position: 'absolute',
            width: '100%',
            height: 280,
          }} />
        <ActivityIndicator color={'#fff'} size={'large'} />
        <Text color='#fff'>Processing your order</Text>
      </View>}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Pressable
          onPress={() => props.navigation.goBack()}
          style={{ position: 'absolute', top: 20, zIndex: 99999 }}>
          <Icon
            as={ArrowLeftIcon}
            style={{ width: 60, height: 30 }}
            color={colors.title}
          />
        </Pressable>
        <Image
          source={{
            uri: menuItem?.image,
          }}
          resizeMode="cover"
          height={280}
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
              return (
                <SelectedButton
                  key={key}
                  text={item}
                  selected={selectedSize}
                  onPress={() => setSelectedSize(item)}
                />
              );
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
      {/* <HStack
        p={16}
        borderTopColor={colors.gray1}
        borderTopWidth={1}
        gap={10}
        justifyContent="space-between">
        <Button
          h={60}
          flexGrow={1}
          rounded={12}
          onPress={handleAddToCart}
          variant="outline"
          borderColor={loading ? colors.greyMid : colors.primary}
          disabled={loading}>
          <ButtonText color={loading ? colors.greyMid : colors.primary} fontSize={16}>
            {loading ? 'Adding...' : 'Add to Cart'}
          </ButtonText>
          {loading && <ActivityIndicator color={colors.greyMid} size={'large'} />}
        </Button>
        <Button
          h={60}
          w="$1/3"
          rounded={12}
          bg={colors.primary}
          onPress={handleBuyNow}> 
          <ButtonText fontSize={16}>Buy Now</ButtonText>
        </Button>
      </HStack> */}

      <HStack
        p={16}
        borderTopColor={colors.gray1}
        borderTopWidth={1}
        gap={10}
        justifyContent="space-evenly"
        alignItems="center">

        <HStack alignItems="center"
          w="$1/3" gap={8} borderRadius={12} p={4} borderWidth={1} borderColor={colors.greyMid} justifyContent='space-evenly'>
          <Pressable
            onPress={onDecrement}
            $active-opacity={0.8}
            w={28}
            h={28}
            rounded="$full"
            bg={colors.buttonGray}
            disabled={qty <= 1}>
            <Center flex={1}>
              <Text fontSize={30} color={colors.primary} fontWeight="300">
                -
              </Text>
            </Center>
          </Pressable>
          <Text color="$black" fontWeight="$semibold">
            {qty}
          </Text>
          <Pressable
            onPress={onIncrement}
            $active-opacity={0.8}
            w={28}
            h={28}
            rounded="$full"
            bg={colors.buttonGray}>
            <Center flex={1}>
              <Text fontSize={30} color={colors.primary} fontWeight="300">
                +
              </Text>
            </Center>
          </Pressable>
        </HStack>

        {/* Add to Cart Button */}
        <Button
          h={60}
          // flexGrow={1}
          rounded={12}
          w="$1/3"
          onPress={handleAddToCart}
          variant="outline"
          borderColor={loading ? colors.greyMid : colors.primary}
          disabled={loading}>
          <ButtonText color={loading ? colors.greyMid : colors.primary} fontSize={16}>
            {loading ? 'Adding...' : 'Add to Cart'}
          </ButtonText>
          {loading && <ActivityIndicator color={colors.greyMid} size={'large'} />}
        </Button>

        {/* Buy Now Button */}
        <Button
          h={60}
          w="$1/3.2"
          rounded={12}
          // bg={colors.primary}
          variant="outline"
          borderColor={loading ? colors.greyMid : colors.primary}
          disabled={loading}
          onPress={handleBuyNow}>
          <ButtonText color={loading ? colors.greyMid : colors.primary} fontSize={16}>Buy Now</ButtonText>
        </Button>
      </HStack>


      <CustomBottomSheet ref={bottomSheetRef}>
        <CartModal
          onClose={() => bottomSheetRef.current.close()}
          onContinueShopping={() => {
            bottomSheetRef.current.close();
            setTimeout(() => {
              props.navigation.goBack();
            }, 100);
          }}
          onViewCart={() => {
            bottomSheetRef.current.close();
            props.navigation.navigate('Cart');
          }}
        />
        {/* <Text>This is inside Bottom Sheet</Text>
        <Button title="Close" onPress={() => bottomSheetRef.current.close()} /> */}
      </CustomBottomSheet>
    </Box>
  );
}
