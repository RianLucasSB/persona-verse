import { ICharacter } from "./character";
import { IMessage } from "./message";

export interface IChat {
  messages: IMessage[],
  characterId: number
}