import React from "react";
import { Text } from "react-native";
import { ButtonLabel, Container, Entrar, ImageView, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
      <Entrar onPress={() => navigation.navigate('Checkout')}>
        <ButtonLabel>Check-out</ButtonLabel>
      </Entrar>
      <Entrar>
        <ButtonLabel>Limpeza</ButtonLabel>
      </Entrar>
      <Entrar>
        <ButtonLabel>Conferência</ButtonLabel>
      </Entrar>
      <Entrar>
        <ButtonLabel>Manutenção</ButtonLabel>
      </Entrar>
    </Container>
  );
};

export default Home;
