//@ts-nocheck
import React, { useEffect } from "react";
import { ActionView, ButtonLabel, Container, Entrar, ImageView, Logo, Title, Voltar } from "./styles";
import { useNavigation } from "@react-navigation/native";

const StartReview = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params.title);
  useEffect(() => {
    let thisDate = new Date();
    let day = ("0" + thisDate.getDate()).slice(-2);
    let month = ("0" + (thisDate.getMonth() + 1)).slice(-2);
    let year = thisDate.getFullYear();
    let date = year + "-" + month + "-" + day;
    thisDate.setHours(thisDate.getHours() - 3);
  
   
  }, []);
  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
        <Title>{route.params.title}</Title>
        <ActionView>
          <Entrar onPress={() => navigation.navigate('Wardrobe', { title: route.params.title })}>
            <ButtonLabel>Começar</ButtonLabel>
          </Entrar>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
        </ActionView>
    </Container>
  );
};

export default StartReview;
