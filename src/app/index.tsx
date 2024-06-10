import { Footer } from '@/components/Footer';
import React from 'react';
import { FlatList, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clsx } from "clsx"
import { SelectCharacter } from '@/components/SelectCharacter';
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Message } from '@/components/Message';

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
  const bottomSheetRef = useRef<BottomSheet>()

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.expand()
  }

  return (
    <SafeAreaView className='flex-1 bg-brand-background'>
      <KeyboardAvoidingView className='flex-1' behavior='padding'>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 24, padding: 20 }}
          renderItem={({ item }) => <Message content={item.text} isMe={item.isMe} />}
          data={messages}
        />
        <Footer handleOpenBottomSheet={handleOpenBottomSheet}
        />
      </KeyboardAvoidingView>
      <SelectCharacter ref={bottomSheetRef} />

    </SafeAreaView>
  );
}