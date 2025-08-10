import { useRouter } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

export default function TabTwoScreen() {
  const router = useRouter();

  return (
    <View className="w-full h-full container p-20 justify-center items-center bg-indigo-400">
      <View className="border w-[95%] h-[40%] rounded-lg items-center justify-center bg-violet-500">
        <Text className="prueba">LOGIN</Text>
        <CustomTextInput label={"Usuario"}></CustomTextInput>
        <CustomTextInput label={"Contraseña"}></CustomTextInput>
        <Button title="Entrar"></Button>
      </View>
    </View>
  );
}

const CustomTextInput = ({ label }: { label: string }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput className="border rounded-md outline-1 my-7]"></TextInput>
    </View>
  );
};
