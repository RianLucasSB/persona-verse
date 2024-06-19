import { ICharacter } from "@/interfaces/character"
import { IMessage } from "@/interfaces/message"
import { http } from "@/server/http"

export const CharactersApi = {
  findAll: async () => {
    const { data } = await http.get<ICharacter[]>("/characters")
    return data
  },
  ask: async (characterId: number, message: string) => {
    const { data } = await http.post<AskQuestionResponse>(`/ask/${characterId}`, {
      question: message
    })
    return data
  },
}

interface AskQuestionResponse {
  answer: string;
}