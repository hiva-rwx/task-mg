import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import SliceModal from "@/components/SliceModal";
import TextField from "@/components/TextField";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getData, insertData } from "@/db";

type ItemData = {
  id: string;
  title: string;
  completed: boolean;
};

const DATA: ItemData[] = [
  {
    id: "1",
    title: "First Item 1",
    completed: false,
  },
  {
    id: "2",
    title: "Second Item 2",
    completed: false,
  },
  {
    id: "3",
    title: "Third Item 3",
    completed: true,
  },
  {
    id: "4",
    title: "First Item 4",
    completed: false,
  },
  {
    id: "5",
    title: "Second Item 5",
    completed: true,
  },
  {
    id: "6",
    title: "Third Item 6",
    completed: false,
  },
  {
    id: "7",
    title: "First Item 7",
    completed: false,
  },
  {
    id: "8",
    title: "Second Item 8",
    completed: false,
  },
  {
    id: "9",
    title: "Third Item 9",
    completed: false,
  },
  {
    id: "10",
    title: "First Item 10",
    completed: false,
  },
  {
    id: "11",
    title: "Second Item 11",
    completed: false,
  },
  {
    id: "12",
    title: "Third Item 12",
    completed: false,
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  setChecked: (id: string) => void;
};

const Item = ({ item, onPress, backgroundColor, setChecked, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Link
      href={{
        pathname: "/task",
        params: { id: item.id },
      }}
    >
      <ThemedText style={[styles.title, { color: textColor }]}>{item.title}</ThemedText>
    </Link>
    <Checkbox
      value={item.completed}
      onValueChange={() => setChecked(item.id)}
      color={true ? "#4630EB" : undefined}
    />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [data, setData] = useState(DATA);
  const [selectedId, setSelectedId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  useEffect(() => {

    // console.log(getData())
  }, [])
  

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const setChecked = useCallback(
    (id: string) => {
      setData(data.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));
    },
    [data]
  );

  const handleNewTask = async () => {
    if (!inputTitle.length) {
      return Alert.alert("Enter Task Title");
    }
    const a = await insertData(inputTitle, inputDesc);
    console.log('result ====> ',a)

  };

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "#dcdce1" : "#ffffff";
    const color = "black";

    return (
      <Item
        item={item}
        setChecked={() => setChecked(item.id)}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.newTask}>
          <ThemedText type="defaultSemiBold">New Task</ThemedText>
          <Pressable style={{ padding: 4 }} onPress={() => setIsModalVisible(true)}>
            <AntDesign name="plus" size={24} color="black" />
          </Pressable>
        </ThemedView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
      <SliceModal title="New Task" isVisible={isModalVisible} onClose={onModalClose}>
        <ThemedView style={{ padding: 26 }}>
          <TextField inputValue={inputTitle} setInputValue={setInputTitle} placeholder="Title" />
          <TextField
            style={{ marginVertical: 8 }}
            inputValue={inputDesc}
            setInputValue={setInputDesc}
            placeholder="Description"
          />
          <Button title="Add" onPress={handleNewTask} />
        </ThemedView>
      </SliceModal>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
  },
  newTask: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
