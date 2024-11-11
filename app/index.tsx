import { Text, View } from "react-native";
import Login from './../components/Login';
import Login_animations from './../components/Login_animations';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Login_animations/>
    </View>

  );
}
