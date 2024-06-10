import { Image, Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

interface Props {
  handleOpenBottomSheet: () => void
}


export function Footer({ handleOpenBottomSheet }: Props) {
  return (
    <View className='flex-row w-full p-4 items-center justify-between space-x-4'>
      <Pressable onPress={handleOpenBottomSheet} className='rounded-full h-14 w-14 overflow-hidden items-center justify-center'>
        <Image className='bg-brand-primary h-14 w-14' source={require('../../assets/ricky.png')} />
      </Pressable>

      <View className='flex-1 flex-row items-center justify-between h-14 bg-zinc-200 rounded-full p-4'>
        <TextInput className='' placeholder='Digite sua mensagem' />
        <Ionicons name="send-sharp" size={28} color="#5005F2" />
      </View>

    </View>
  )
}