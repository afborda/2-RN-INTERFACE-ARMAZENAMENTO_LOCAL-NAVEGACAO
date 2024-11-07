import { NavigationContainer } from "@react-navigation/native";
import Groups from "@screens/Groups";
import { AppRoutes } from "./app.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
