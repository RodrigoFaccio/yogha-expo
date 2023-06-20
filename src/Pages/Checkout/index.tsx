// @ts-nocheck
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Container,
  ImageArrow,
  ImageFake,
  ImageView,
  LabelFalse,
  LabelTitle,
  LabelTrue,
  ListContainer,
  ListTitle,
  ListView,
  ListViewSelect,
  Logo,
  ScrollList,
} from "./styles";
import { React, useEffect, useState } from "react";
import api from "../../Services/api";
import { View } from "react-native";

const Checkout = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    async function requestOrders() {
      let thisDate = new Date();
      let day = ("0" + thisDate.getDate()).slice(-2);
      let month = ("0" + (thisDate.getMonth() + 1)).slice(-2);
      let year = thisDate.getFullYear();
      let date = year + "-" + month + "-" + day;
      try {
        const listarSaidaHoje = await api.post('/listar_hoje', {
          date
        });

        const arrComPrioridade = listarSaidaHoje.data.result.map((item) => {
          return {
            name: item.name,
            id:item.id,
            booking:item.booking_list_id,
            departureDate:item.departure_date,
            accommodation: item.accommodation,
            web: item.web,
            prioridade: false,
            renovacao: false,
          };
        });

        const listarEntradaHoje = await api.post(
          `/listar_entrada_hoje/`, {
            date
          }
        );

        const listarHojeRenovacao = listarEntradaHoje.data.result.map(
          (item) => {
            return {
              name: item.name,
              id:item.id,
              booking:item.booking_list_id,
              departureDate:item.departure_date,
              accommodation: item.accommodation,
              web: item.web,
              renovacao:
                item.web === "Renovacao-MidStay" || item.web === "Renovacao"
                  ? true
                  : false,
            };
          }
        );

        const novaListaPrioridade = arrComPrioridade.map((obj1) => {
          const objetoEncontrado = listarHojeRenovacao.find(
            (obj2) => obj1.accommodation === obj2.accommodation
          );
          if (objetoEncontrado) {
            return {
              ...obj1,
              prioridade: true,
              renovacao: objetoEncontrado.renovacao,
            };
          }
          return { ...obj1, prioridade: false, renovacao: obj1.renovacao };
        });

        const novaLista = novaListaPrioridade.map((item) => {
          return {
            name: item.name,
            accommodation: item.accommodation,
            web: item.web,
            id:item.id,
            booking:item.booking,
            departureDate:item.departureDate,
            renovacao: item.renovacao,
            prioridade: item.prioridade,
          };
        });

        const groupedData = novaLista.reduce((result, obj) => {
          const foundGroup = result.find((group) => group.name === obj.name);
          if (foundGroup) {
            foundGroup.items.push(obj);
          } else {
            result.push({ name: obj.name, items: [obj] });
          }
          return result;
        }, []);
        const trueNewValues = groupedData.map((item) => item.items.sort((a,b) => b.prioridade - a.prioridade));
        setList(groupedData);
      } catch (error) {
        console.log(error);
      }
    }

    requestOrders();
    function formatarData(data) {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);
    setDate(dataFormatada);
  }, [isFocused]);

  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
      <ListContainer>
        <ListTitle>
          <ImageFake></ImageFake>
          <LabelTitle>{date}</LabelTitle>
          <ImageArrow onPress={() => navigation.navigate('Tomorrow')}>
            <Logo source={require("../../Assets/forward.png")}/>
          </ImageArrow>
        </ListTitle>
        <ScrollList>
          {list.map((item, index) => (
            <ListView key={index}>
              <LabelTitle>{item.name}</LabelTitle>
              {item.items.map((item2, index) => {
                if (item2.renovacao === false) {
                  return (
                    <View key={index}>
                      {item2.prioridade ? (
                        <ListViewSelect onPress={() => navigation.navigate('StartReview', { title: item2.accommodation,id:item2.id,booking:item2.booking,departureDate:item2.departureDate,prioridade:item.prioridade })} >
                          <LabelTrue>{item2.accommodation}</LabelTrue>
                        </ListViewSelect>
                      ) : (
                        <ListViewSelect onPress={() => navigation.navigate('StartReview',{ title: item2.accommodation,id:item2.id,booking:item2.booking,departureDate:item2.departureDate,prioridade:item.prioridade })}  >
                          <LabelFalse>{item2.accommodation}</LabelFalse>
                        </ListViewSelect>
                      )}
                    </View>
                  );
                }
              })}
            </ListView>
          ))}
        </ScrollList>
      </ListContainer>
    </Container>
  );
};

export default Checkout;
