import { createDrawerNavigator } from "@react-navigation/drawer";
import About from "./About";
import Logout from "./Logout";
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="About">
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
