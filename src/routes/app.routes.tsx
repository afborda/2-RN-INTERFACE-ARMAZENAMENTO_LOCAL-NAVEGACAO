import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "../screens/Groups";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Groups" component={Groups} />
    </Navigator>
  );
}
