import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState} from 'react';

import {useTheme} from '../../../../theme/useTheme';
import { KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate} from '../../../../navigators/Root';
import { ItemCard, PrimaryButton} from '../../../../components';

import useApp from '../../../../hooks/useCategory';
import useMenu from '../../../../hooks/useMenu';

export default function SetupScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const {categories} = useApp();
  const {menu} = useMenu();
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Box p={16}>
            <VStack gap={16}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="$bold" color="$black">
                  Categories
                </Text>
                <Pressable
                  $active-opacity={0.8}
                  onPress={() =>
                    navigate('createCategory', {title: 'Create New Category'})
                  }
                  h={34}
                  rounded="$full"
                  borderWidth={1}
                  px={10}
                  borderColor={colors.primary}
                  flexDirection="row"
                  alignItems="center">
                  <Icon as={AddIcon} color={colors.primary} mr={2} />
                  <Text
                    fontWeight="$light"
                    fontSize={14}
                    color={colors.primary}>
                    New Category
                  </Text>
                </Pressable>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack gap={12}>
                  {categories.map((item: any, key: number) => {
                    return (
                      <Button
                        key={key}
                        onPress={() => setSelectedIndex(key)}
                        variant="solid"
                        bg={
                          selectedIndex === key ? colors.primary : colors.white
                        }
                        borderWidth={1}
                        borderColor={
                          selectedIndex === item ? colors.primary : colors.gray1
                        }
                        rounded="$full">
                        <ButtonText
                          fontSize={14}
                          mr={4}
                          color={
                            selectedIndex === key ? colors.white : colors.title
                          }>
                          {item.categoryName}
                        </ButtonText>
                        {/* <Icons.Pencil color={selectedIndex === key && colors.white} /> */}
                      </Button>
                    );
                  })}
                </HStack>
              </ScrollView>
              <Text fontWeight="$bold" color="$black">
                Menu Items
              </Text>
              {menu?.map((item: any, key: number)=>{
                return(
                  <ItemCard key={key} title={item.itemName} description={item.description} price={item.price} image={item.image} />
                )
              })}
              <PrimaryButton
                onPress={() =>
                  navigate('createMenu', {title: 'Add New Menu Item'})
                }
                borderStyle="dotted"
                borderColor="#BFDBFE"
                color={colors.primary}
                icon={<Icon as={AddIcon} color={colors.primary} />}
                text="Add Item"
                variant="outlined"
              />
            </VStack>
          </Box>
        </ScrollView>
        <Box
          bg={colors.white}
          p={16}
          borderColor={colors.gray1}
          borderWidth={1}>
          <PrimaryButton  onPress={()=> navigate('setupRest')} text="Continue to Dashboard" />
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
