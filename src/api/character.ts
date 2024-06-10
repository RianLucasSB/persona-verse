import { ICharacter } from "@/interfaces/character"
import { IMessage } from "@/interfaces/message"
import { http } from "@/server/http"

export const CharactersApi = {
  findAll: async () => {
    const { data } = await http.get<ICharacter[]>("/characters")
    return data
  },
  ask: async () => {
    const { data } = await http.post<IMessage>("/characters")
    return data
  },
}