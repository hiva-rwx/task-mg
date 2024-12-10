import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?:string
}>;

const SliceModal = ({ isVisible, children, onClose ,title }: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <ThemedView style={styles.modalContent}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>{title}</ThemedText>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </ThemedView>
        {children}
      </ThemedView>
    </Modal>
  );
};

export default SliceModal;

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "8%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
