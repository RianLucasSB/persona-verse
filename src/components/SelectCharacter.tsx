import BottomSheet, { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ICharacter } from "@/interfaces/character";
import { CharactersApi } from "@/api/character";
import { useCharacterContext } from "@/contexts/character";

export const SelectCharacter = forwardRef<BottomSheet>(({ }, ref) => {
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const { selectCharacter } = useCharacterContext()

  const innerRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  const handleCloseBottomSheet = () => {
    innerRef.current.close()
  }

  async function fetchCharacters() {
    try {
      const data = await CharactersApi.findAll()
      setCharacters(data)
    } catch (error) {
      console.log(error)
    }

  }

  
  function handleChangeCharacter(character: ICharacter) {
    selectCharacter(character)
    handleCloseBottomSheet()
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <BottomSheet
      ref={innerRef}
      handleComponent={() => null}
      index={0}
      snapPoints={[0.01, 530]}>
      <View className="flex-1 bg-brand-background/95 p-4">
        <Pressable onPress={handleCloseBottomSheet} className="mb-6">
          <Ionicons name="close" size={32} color="#fff" />
        </Pressable>
        <BottomSheetFlatList
          columnWrapperStyle={{ gap: 50 }}
          contentContainerStyle={{ width: '100%', gap: 50 }}
          data={characters}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View className="items-center gap-2">
                <Pressable key={item.id} onPress={() => handleChangeCharacter(item)} className='rounded-full overflow-hidden items-center justify-center'>
                  <Image className='bg-brand-primary h-24 w-24 object-cover' source={{ uri: item.imageUrl }} />
                </Pressable>
                <Text className="text-white">{item.name}</Text>
              </View>
            )
          }}
        />
      </View>
    </BottomSheet>
  )
})