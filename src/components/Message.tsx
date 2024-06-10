import clsx from "clsx";
import { Text, View } from "react-native";

interface MessageProps {
  content: string;
  isMe: boolean;
}
export function Message({ content, isMe }: MessageProps) {
  return (
    <View className={clsx('p-4 w-[80%] rounded-lg', isMe ? 'self-end bg-brand-primary' : 'self-start bg-zinc-900 text-white')}>
      <Text className={clsx('text-[16px] font-roboto-regular', isMe ? 'text-black' : 'text-white')}>{content}</Text>
    </View>
  )
}