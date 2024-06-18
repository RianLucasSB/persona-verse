import { Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useCharacterContext } from "@/contexts/character";
import { useState } from "react";
import { useChatStore } from "@/stores/chat";

interface Props {
  handleOpenBottomSheet: () => void
}


export function Footer({ handleOpenBottomSheet }: Props) {
  const { selectedCharacter } = useCharacterContext()
  const { pushMessage } = useChatStore()

  const [text, setText] = useState('')

  function sendMessage() {
    pushMessage(selectedCharacter.id, {content: text, createdAt: new Date(), fromUser: true})
  }


  return (
    <View className={`flex-row w-full p-4 items-center  space-x-4 ${selectedCharacter ? 'justify-between' : 'justify-center'}`}>
      {selectedCharacter ? (
        <>
          <Pressable
            onPress={handleOpenBottomSheet}
            className='rounded-full h-14 w-14 overflow-hidden items-center justify-center'
          >
            <Image className='bg-brand-primary h-14 w-14' source={{ uri: selectedCharacter.imageUrl }} />
          </Pressable>
          <View className='flex-1 flex-row items-center justify-between h-14 bg-zinc-200 rounded-full p-4'>
            <TextInput value={text} onChangeText={setText} className='' placeholder='Digite sua mensagem' />
            <Pressable onPress={sendMessage}>
              <Ionicons name="send-sharp" size={28} color="#5005F2" />
            </Pressable>
          </View>
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