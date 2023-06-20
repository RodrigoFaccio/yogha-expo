//@ts-nocheck
import React, { useEffect } from "react";
import { ActionView, ButtonLabel, Container, Entrar, ImageView, Logo, Title, Voltar } from "./styles";
import { useNavigation } from "@react-navigation/native";

const StartReview = ({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    let thisDate = new Date();
    let day = ("0" + thisDate.getDate()).slice(-2);
    let month = ("0" + (thisDate.getMonth() + 1)).slice(-2);
    let year = thisDate.getFullYear();
    let date = year + "-" + month + "-" + day;
    thisDate.setHours(thisDate.getHours() - 3);
  
   
  }, []);
  const startCheckOut = async ()=>{
    let thisDate = new Date();
    thisDate.setHours(thisDate.getHours() - 3);

   /*  const  result = await api.put('/iniciar_limpeza', {
      id_accommodation: route.params.id,
      id_booking:  route.params.booking,
      departure_date: route.params.departureDate,
      type: route.params.prioridade?'Prioridade':'Normal',
      initiated_at: thisDate
    }); */
    
      let types =  route.params.prioridade?'Prioridade':'Normal'
    
    console.log({
      id_accommodation: route.params.id,
      id_booking:  route.params.bookingId,
      departure_date: route.params.departureDate,
      type: types,
      initiated_at: thisDate
    })

    //navigation.navigate('Wardrobe', { title: route.params.title })}
  }
  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
        <Title>{route.params.title}</Title>
        <ActionView>
          <Entrar onPress={() => startCheckOut()}>
            <ButtonLabel>Começar</ButtonLabel>
          </Entrar>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
        </ActionView>
    </Container>
  );
};

export default StartReview;
