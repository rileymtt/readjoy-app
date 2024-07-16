import Cloud from "@/components/Cloud";
import AuthRoutes from "@/routes/auth.routes";
import MainRoutes from "@/routes/main.routes";
import { useAppSelector } from "@/store/hooks";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

export default function App() {
  return (
    <React.Fragment>
      <Cloud />
      <NavigationContainer independent={true}>
        <CheckAuth />
      </NavigationContainer>
    </React.Fragment>
  );
}

function CheckAuth() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const { information, loading } = userReducer;

  if (loading) return null;
  return information ? <MainRoutes /> : <AuthRoutes />;
}
