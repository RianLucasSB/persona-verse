import { ICharacter } from "@/interfaces/character";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ICharacterContext {
  selectedCharacter: ICharacter,
  selectCharacter: (character: ICharacter) => void
}

const CharacterContext = createContext<ICharacterContext>({} as ICharacterContext)

export const CharacterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null)


  function selectCharacter(character: ICharacter) {
    setSelectedCharacter(character)
  }

  return (
    <CharacterContext.Provider value={{
      selectedCharacter,
      selectCharacter
    }}>{children}</CharacterContext.Provider>
  )
}

export const useCharacterContext = () => useContext(CharacterContext)