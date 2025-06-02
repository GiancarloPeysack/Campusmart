import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import {Badge, DishCard} from '../../../components';
import {Image, ScrollView} from 'react-native';
import {navigate} from '../../../navigators/Root';
import useRestaurents from '../../../hooks/public/useRestaurents';
import useMenus from '../../../hooks/public/useMenus';

interface Restaurant {
  id: string;
  nameOfRestaurent: string;
  discount: number;
  coverImage: string;
  deliveryCharge: number;
  bio: string;
}

interface Category {
  categoryName: string;
}

interface Menu {
  id: string;
  itemName: string;
  price: string;
  description: string;
  image: string;
  category: string
}

export default function RestaurantScreen(props: any): React.JSX.Element {
  const {colors} = useTheme();

  const {id} = props.route.params;

  const {fetchRestaurantById, fetchCategories, isLoading} = useRestaurents();
  const {fetchMenusByRestaurantId, isLoading: fetchingMenus} = useMenus();

  const [restaurant, setRestaurent] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<any>([]);

  const [selectedIndex, setSelectedIndex] = useState<string>('All Items');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchRestaurantById(id);
        const catData = await fetchCategories(id);
        const menuData = await fetchMenusByRestaurantId(id);

        setRestaurent(data as Restaurant);
        const allItemsCategory = {categoryName: 'All Items'};
        setCategories([allItemsCategory, ...catData]);

        setMenus(menuData);
      };

      fetchData();
    }
  }, [id]);

  const filterData = useMemo(() => {
    if (selectedIndex === 'All Items') {
      return menus;
    }
    return menus.filter((menu: Menu) => menu.category === selectedIndex);
  }, [menus, selectedIndex]);

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
      <Image
        source={{
          uri: restaurant?.coverImage,
        }}
        resizeMode="cover"
        height={200}
        style={{width: '100%'}}
        alt="card-image"
      />
      <VStack
        gap={8}
        p={16}
        borderBottomColor={colors.gray1}
        borderBottomWidth={1}>
        <Text fontSize={24} fontWeight="$bold" color="$black">
          {restaurant?.nameOfRestaurent}
        </Text>
        <HStack alignItems="center" gap={5}>
          <Text fontSize={14} color={colors.title}>
            {restaurant?.bio}
          </Text>
        </HStack>
        <HStack gap={8} flexWrap="wrap">
          <Badge
            icon={<Icons.Bike />}
            text={
              restaurant?.deliveryCharge === 0
                ? 'Free Delivery'
                : `$${restaurant?.deliveryCharge}`
            }
          />
          <Badge
            icon={<Icons.Tag />}
            text={`${restaurant?.discount}% Student Discount`}
          />
        </HStack>
        <ScrollView
          style={{marginTop: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <HStack gap={12}>
            {categories?.map((item: Category, key: number) => {
              return (
                <Button
                  key={key}
                  onPress={() => setSelectedIndex(item.categoryName)}
                  variant="solid"
                  bg={
                    selectedIndex === item.categoryName
                      ? '$black'
                      : colors.buttonGray
                  }
                  rounded={25}>
                  <ButtonText
                    fontSize={14}
                    color={
                      selectedIndex === item.categoryName
                        ? colors.white
                        : colors.title
                    }>
                    {item.categoryName}
                  </ButtonText>
                </Button>
              );
            })}
          </HStack>
        </ScrollView>
      </VStack>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1} gap={16}>
         {filterData?.length  >0?  filterData.map((item: Menu, index: number) => (
            <DishCard
              key={index}
              onPress={() => navigate('Dish', {title: 'Dish Details', id: item.id})}
              image={item.image}
              title={item.itemName}
              description={item.description}
              price={item.price}
            />
          )) : <Center>
            <Text fontSize={12} textTransform='uppercase'>No items</Text>
            </Center>}
        </VStack>
      </ScrollView>
    </Box>
  );
}
