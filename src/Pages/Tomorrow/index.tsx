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

const Tomorrow = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    async function requestOrders() {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      let day = ("0" + currentDate.getDate()).slice(-2);
      let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      let year = currentDate.getFullYear();
      let date = year + "-" + month + "-" + day;
      console.log(date);

      try {
        const listarSaidaHoje = await api.post('/listar_amanha', {
          date
        });

        const arrComPrioridade = listarSaidaHoje.data.result.map((item) => {
          return {
            name: item.name,
            accommodation: item.accommodation,
            web: item.web,
            prioridade: false,
            renovacao: false,
          };
        });

        const listarEntradaHoje = await api.post(
          `/listar_entrada_amanha/`, {
            date
          }
        );

        const listarHojeRenovacao = listarEntradaHoje.data.result.map(
          (item) => {
            return {
              name: item.name,
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
      const dia = String(data.getDate() + 1).padStart(2, "0");
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
          <ImageArrow onPress={() => navigation.navigate('Checkout')}>
            <Logo source={require("../../Assets/back.png")}/>
          </ImageArrow>
          <LabelTitle>{date}</LabelTitle>
          <ImageFake></ImageFake>
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
                        <ListViewSelect onPress={() => navigation.navigate('StartReview', { title: item2.accommodation })} >
                          <LabelTrue>{item2.accommodation}</LabelTrue>
                        </ListViewSelect>
                      ) : (
                        <ListViewSelect onPress={() => navigation.navigate('StartReview', { title: item2.accommodation })} >
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

export default Tomorrow;
