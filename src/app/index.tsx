import { Footer } from '@/components/Footer';
import React from 'react';
import { FlatList, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clsx } from "clsx"
import { SelectCharacter } from '@/components/SelectCharacter';
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Message } from '@/components/Message';
import { useChatStore } from '@/stores/chat';
import { useCharacterContext } from '@/contexts/character';


export default function App() {
  const { chats } = useChatStore()
  const { selectedCharacter } = useCharacterContext()
  const bottomSheetRef = useRef<BottomSheet>()

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.expand()
  }

  const messages = chats.find(chat => chat.characterId === selectedCharacter.id)?.messages ?? []

  return (
    <SafeAreaView className='flex-1 bg-brand-background'>
      <KeyboardAvoidingView className='flex-1' behavior='padding'>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 24, padding: 20 }}
          renderItem={({ item }) => <Message content={item.content} isMe={item.fromUser} />}
          data={messages}
        />
        <Footer handleOpenBottomSheet={handleOpenBottomSheet}
        />
      </KeyboardAvoidingView>
      <SelectCharacter ref={bottomSheetRef} />

    </SafeAreaView>
  );
}