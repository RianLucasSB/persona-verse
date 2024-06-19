import { FlatList, Image, Keyboard, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useCharacterContext } from "@/contexts/character";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/chat";
import { CharactersApi } from "@/api/character";

interface Props {
  handleOpenBottomSheet: () => void
  flatListRef: React.MutableRefObject<FlatList<any>>
}


export function Footer({ handleOpenBottomSheet, flatListRef }: Props) {
  const { selectedCharacter } = useCharacterContext()
  const { pushMessage } = useChatStore()

  const [text, setText] = useState('')

  async function sendMessage() {
    pushMessage(selectedCharacter.id, { content: text, createdAt: new Date(), fromUser: true })
    Keyboard.dismiss()
    setText('')
    try {
      const data = await CharactersApi.ask(selectedCharacter.id, text);

      pushMessage(selectedCharacter.id, { content: data.answer, createdAt: new Date(), fromUser: false })
      setTimeout(() => {
        flatListRef.current!.scrollToEnd({ animated: true });
      }, 300);
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <View className={`flex-row w-full p-4 items-center bg-gray-900/10  space-x-4 ${selectedCharacter ? 'justify-between' : 'justify-center'}`}>
      {selectedCharacter ? (
        <>
          <Pressable
            onPress={handleOpenBottomSheet}
            className='rounded-full h-14 w-14 overflow-hidden items-center justify-center'
          >
            <Image className='bg-brand-primary h-14 w-14' source={{ uri: selectedCharacter.imageUrl }} />
          </Pressable>
          <TextInput
            multiline={true}
            value={text}
            onChangeText={setText}
            className='min-h-10 w-64 p-4 bg-white rounded-md'
            placeholder='Digite sua mensagem'
          />
          <Pressable onPress={sendMessage}>
            <Ionicons name="send-sharp" size={28} color="#5005F2" />
          </Pressable>
        </>
      ) : (
        <Pressable
          onPress={handleOpenBottomSheet}
          className='rounded-full py-6 px-4  items-center justify-center bg-purple-900 self-center'
        >
          <Text className="text-white">Selecione um personagem</Text>
        </Pressable>
      )}
    </View>
  )
}