import { IChat } from '@/interfaces/chat'
import { IMessage } from '@/interfaces/message'
import { create } from 'zustand'

type State = {
  chats: IChat[]
}

type Actions = {
  pushMessage: (characterId: number, message: IMessage) => void
}

export const useChatStore = create<State & Actions>((set, get) => ({
  chats: [],
  pushMessage: (characterId: number, message: IMessage) => {
    const aux = get().chats.find(chat => chat.characterId === characterId)

    if(aux){
      aux.messages.push(message)
      set((state) => ({
        chats: state.chats.map(chat =>  chat.characterId === characterId ? aux : chat)
      }))
      return
    }

    set((state) => ({
      chats: [...state.chats, {characterId, messages: [message]}]
    }))
  },
}))