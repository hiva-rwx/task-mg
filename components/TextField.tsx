import { Dispatch, SetStateAction, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Text,
  ViewProps,
} from "react-native";
import { ThemedView } from "./ThemedView";

type Props = ViewProps & {
  isFocusedField?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

const TextField = ({
  style,
  isFocusedField = false,
  placeholder,
  inputValue,
  setInputValue,
}: Props) => {
  const [isFocused, setIsFocused] = useState(isFocusedField);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (text: string) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    console.log("Input Submitted: ", inputValue);
  };
  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      selectionColor={BLUE}
      underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}
      style={[styles.textField, style]}
      value={inputValue}
      onChangeText={handleChange}
      onSubmitEditing={handleSubmit}
      placeholder={placeholder}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textField: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
  },
});
