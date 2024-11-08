import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useLocalSearchParams } from "expo-router";

const Task = () => {
  const { id } = useLocalSearchParams()
  console.log(id);
  return (
    <ThemedView>
        <ThemedText>Task</ThemedText>
    </ThemedView>
  )
}

export default Task