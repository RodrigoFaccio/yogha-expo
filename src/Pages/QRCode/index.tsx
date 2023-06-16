//@ts-nocheck
import React from "react";
import { ActionView, ButtonLabel, Container, Entrar, ImageView, Logo, Title, Voltar, CamImage } from "./styles";
import { useNavigation } from "@react-navigation/native";

const QRCode = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params.title);
  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
        <Title>{'Ler QRCode'}</Title>
        <ActionView>
          <Entrar>
            <CamImage source={require("../../Assets/cam.png")} />
          </Entrar>
          <Voltar onPress={() => navigation.navigate('Others', {title: route.params.title})}>Voltar</Voltar>
        </ActionView>
    </Container>
  );
};

export default QRCode;
