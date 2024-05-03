import { Footer } from '@/components/Footer';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clsx } from "clsx"

const messages = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laboriosam accusantium repellat sint ducimus nobis cupiditate at quo aperiam molestiae possimus ut ipsum enim, fugiat illum modi! Non, consequatur dicta.",
    isMe: true
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laboriosam accusantium repellat sint ducimus nobis cupiditate at quo aperiam molestiae possimus ut ipsum enim, fugiat illum modi! Non, consequatur dicta.",
    isMe: false
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laboriosam accusantium repellat sint ducimus nobis cupiditate at quo aperiam molestiae possimus ut ipsum enim, fugiat illum modi! Non, consequatur dicta.",
    isMe: true
  },
]

export default function App() {
  function renderItem(item: { text: string, isMe: boolean }) {
    return (
      <View className={clsx('p-4 w-[80%] rounded-lg', item.isMe ? 'self-end bg-brand-primary' : 'self-start bg-zinc-900 text-white')}>
        <Text className={item.isMe ? 'text-black' : 'text-white'}>{item.text}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-brand-background'>
      <View className='flex-1 p-2'>
        <FlatList showsVerticalScrollIndicator={false}  contentContainerStyle={{gap: 24, padding: 20}} renderItem={({ item }) => renderItem(item)} data={messages} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}