import {View, Text, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { SearchCard } from './SearchCard';

export default function Search(props: any) {
  const {colors} = useTheme();
  const {popular} = props.route.params;

  const [selectedIndex, setSelectedIndex] = useState<number>(popular === 'restaurants' ? 1 : 2);

  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1} gap={20}>
          <ButtonGroup space="sm">
            <Button onPress={()=> setSelectedIndex(1)} variant="solid" bg={selectedIndex ===1 ? colors.primary : colors.buttonGray} rounded={25}>
              <ButtonText fontSize={14} color={selectedIndex ===1 ? colors.white : '$black'}>Restaurants</ButtonText>
            </Button>
            <Button
            onPress={()=> setSelectedIndex(2)}
              variant="solid"
              bg={selectedIndex ===2 ? colors.primary : colors.buttonGray} 
              action="positive"
              rounded={25}>
              <ButtonText fontSize={14} color={selectedIndex ===2 ? colors.white : '$black'}>
                Dishes
              </ButtonText>
            </Button>
          </ButtonGroup>
        <SearchCard title='Ogala' location='123 Main Street, Sydney' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt69ZYdYx_svjbjPgUjsZXwgPiwwZQ_S8_Dg&s' />
        </VStack>
      </ScrollView>
    </Box>
  );
}
