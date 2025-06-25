import { Pressable, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  VStack,
  Text,
  Icon,
  ArrowLeftIcon,
} from '@gluestack-ui/themed';
import { useTheme } from '../../../theme/useTheme';
import { SearchCard } from './SearchCard';
import useRestaurents from '../../../hooks/public/useRestaurents';
import useMenus from '../../../hooks/public/useMenus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icons } from '../../../assets/icons';
import useAuth from '../../../hooks/useAuth';


export default function Search(props: any) {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { restaurents, isLoading } = useRestaurents();
  const { menus, isLoading: fetchingMenus } = useMenus();
  const { user } = useAuth();

  const SEARCH_HISTORY_KEY = `SEARCH_HISTORY_${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      loadSearchHistory();
    }
  }, [user]);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (err) {
      console.log('Error loading history:', err);
    }
  };

  const saveSearchHistory = async (term: string) => {
    try {
      let updatedHistory = [term, ...searchHistory.filter(t => t !== term)];
      updatedHistory = updatedHistory.slice(0, 2);
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (err) {
      console.log('Error saving history:', err);
    }
  };

  const deleteHistoryItem = async (item: string) => {
    try {
      const updatedHistory = searchHistory.filter(term => term !== item);
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (err) {
      console.log('Error deleting history item:', err);
    }
  };

  useEffect(() => {
    if (restaurents) {
      const filtered = restaurents.filter((r: any) =>
        r.nameOfRestaurent.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchTerm, restaurents]);

  useEffect(() => {
    if (menus) {
      const filtered = menus.filter((m: any) =>
        m.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMenus(filtered);
    }
  }, [searchTerm, menus]);

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      saveSearchHistory(searchTerm);
    }
  };

  const renderRestaurants = () => {
    if (isLoading) return <Text>Loading Restaurants...</Text>;
    if (filteredRestaurants.length === 0) return <Text>No Restaurants Found</Text>;

    return filteredRestaurants.map((restaurant: any, index: number) => (
      <SearchCard
        key={index}
        title={restaurant.nameOfRestaurent}
        location="Location not available"
        image={restaurant.coverImage || 'https://via.placeholder.com/150'}
      />
    ));
  };

  const renderMenus = () => {
    if (fetchingMenus) return <Text>Loading Menus...</Text>;
    if (filteredMenus.length === 0) return <Text>No Menus Found</Text>;

    return filteredMenus.map((menu: any, index: number) => (
      <SearchCard
        key={index}
        title={menu.itemName}
        location={menu.category}
        image={menu.image || 'https://via.placeholder.com/150'}
        price={menu.price}
      />
    ));
  };

  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack p={16} flex={1} gap={20}>

          <Box flexDirection='row' alignItems='center'>
            <Pressable onPress={() => props.navigation.goBack()}>
              <Icon as={ArrowLeftIcon} color="$black" />
            </Pressable>
            <TextInput
              placeholder={`Search ${selectedIndex === 1 ? 'Restaurants' : 'Dishes'}`}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              onSubmitEditing={handleSearchSubmit}
              style={{ fontSize: 16, paddingLeft: 10, width: '90%', }}
            />
          </Box>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Box>
              <Box flexDirection='row' justifyContent='space-between' alignItems='center' mb={8}>
                <Text fontSize={16} fontWeight='bold' color={colors.gray5}>Recent Searches</Text>
              </Box>

              {searchHistory.map((item, idx) => (
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => setSearchTerm(item)}>
                    <Icons.History style={{ marginRight: 10, top: 2 }} />
                    <Text fontSize={14} color='$gray600'>{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteHistoryItem(item)}>
                    <Icons.Close style={{ marginRight: 10, top: 2 }} />
                  </TouchableOpacity>
                </View>
              ))}
            </Box>
          )}

          <ButtonGroup space="sm">
            <Button
              onPress={() => { setSelectedIndex(1); setSearchTerm(''); }}
              variant="solid"
              bg={selectedIndex === 1 ? colors.primary : colors.buttonGray}
              rounded={25}>
              <ButtonText fontSize={14} color={selectedIndex === 1 ? colors.white : '$black'}>
                Restaurants
              </ButtonText>
            </Button>
            <Button
              onPress={() => { setSelectedIndex(2); setSearchTerm(''); }}
              variant="solid"
              bg={selectedIndex === 2 ? colors.primary : colors.buttonGray}
              action="positive"
              rounded={25}>
              <ButtonText fontSize={14} color={selectedIndex === 2 ? colors.white : '$black'}>
                Dishes
              </ButtonText>
            </Button>
          </ButtonGroup>

          {selectedIndex === 1 ? renderRestaurants() : renderMenus()}
        </VStack>
      </ScrollView>
    </Box>
  );
}
