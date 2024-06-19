import { Footer } from '@/components/Footer';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
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
  const flatListRef = useRef<FlatList>()

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.expand()
  }


  const messages = chats.find(chat => chat.characterId === selectedCharacter.id)?.messages ?? []

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current!.scrollToEnd({ animated: true });
    }, 300);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-brand-background'>
      <FlatList
        ref={flatListRef}
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24, padding: 20 }}
        renderItem={({ item }) => <Message content={item.content} isMe={item.fromUser} />}
        data={messages}
      />
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <Footer flatListRef={flatListRef} handleOpenBottomSheet={handleOpenBottomSheet}
        />
      </KeyboardAvoidingView>
      <SelectCharacter ref={bottomSheetRef} />

    </SafeAreaView>
  );
}