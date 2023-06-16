import React from "react";
import { Container, ImageView, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();

  const changeSreen = () => {
    // eslint-disable-next-line no-implied-eval
    setTimeout(function () {
      navigation.navigate('Login');
    }, 2000);
  };

  changeSreen();

  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
    </Container>
  );
};

export default Splash;
