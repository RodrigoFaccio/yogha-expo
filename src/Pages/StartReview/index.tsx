//@ts-nocheck
import React, { useEffect } from "react";
import { ActionView, ButtonLabel, Container, Entrar, ImageView, Logo, Title, Voltar } from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/api";

const StartReview = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params);
  useEffect(() => {
    let thisDate = new Date();
    let day = ("0" + thisDate.getDate()).slice(-2);
    let month = ("0" + (thisDate.getMonth() + 1)).slice(-2);
    let year = thisDate.getFullYear();
    let date = year + "-" + month + "-" + day;
    thisDate.setHours(thisDate.getHours() - 3);
  
   
  }, []);


  const startChekOut =async ()=>{
    let thisDate = new Date();
    thisDate.setHours(thisDate.getHours() - 3);


    const result = await api.put('/iniciar_limpeza', {
      id_accommodation: route.params.title,
      id_booking: route.params.booking,
      departure_date: route.params.departureDate,
      type:route.params.prioridade?'Prioridade':'Normal' ,
      initiated_at: thisDate
    });
    console.log(result.data.results.statusInsert)
   
    navigation.navigate('Wardrobe', { title: route.params.title,CheckOutId:result.data.results.statusInsert })

  }



  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
        <Title>{route.params.title}</Title>
        <ActionView>
          <Entrar onPress={() => startChekOut()}>
            <ButtonLabel>Começar</ButtonLabel>
          </Entrar>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
        </ActionView>
    </Container>
  );
};

export default StartReview;
