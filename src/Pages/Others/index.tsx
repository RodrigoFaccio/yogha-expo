//@ts-nocheck
import React, {useState} from "react";
import { Ask, AskView, Container, ImageView, Logo, Title, ActionView, Voltar, 
  InputView, InputQnt, Entrar, ButtonLabel, AddView, AddInsideView, HeaderContainer, 
  BodyContainer, FooterContainer, ImageArrow, ArrowImage, Cam, CamImage, AddInputView, AddContainerView } from "./styles";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';

type SelectType = {
  optSelect: string;
  quantity: number;
  tag:string
};

type OptionType = {
  value: string;
  label: string;
}

const Others = ({route}) => {
  const navigation = useNavigation();

  const [missSome, setMissSome] = useState(false);
  const [problems, setProblems] = useState(false);
  const [manut, setManut] = useState(false);
  const [selectNextTab, setSelecteNextTab] = useState();

  const [isOpen1, setIsOpen1] = useState(false);

  const yesOrNoOptions: string[] = [
    'Sim',
    'Não',
  ]

  const enxovalOptions: OptionType[] = [
    'Lançol',
    'Fronha',
    'Toalha banho',
    'Toalha rosto',
    'Pano de chão',
    'Pano de prato',
    'Manta',
    'Coberta',
  ]

  const eletronicOptions: OptionType[] = [
    'Secador de cabelo',
    'Televisão',
    'Cook top',
    'Microondas',
    'Cafeteira',
    'Frigobar',
    'Geladeira',
    'Sanduicheira',
    'Ferro de passar',
  ]

  const statusOptions: OptionType[] = [
    'Com defeito',
    'Quebrado',
    'Em falta',
  ]

  const manutOptions: OptionType[] = [
    'Lampada',
    'Pintura',
    'Ar condicionado',
    'Pilha porta',
    'Pilha controle ar',
    'Pilha controle TV',
  ]

  const [selects, setSelects] = useState<SelectType[]>([
    { optSelect: enxovalOptions[0].value, quantity: 0 }
  ]);

  const [selects2, setSelects2] = useState<SelectType[]>([
    { optSelect: enxovalOptions[0].value, quantity: 0 }
  ]);

  const [selects3, setSelects3] = useState<SelectType[]>([
    { optSelect: enxovalOptions[0].value, quantity: 0 }
  ]);

  const addSelect = () => {
    setSelects([...selects, { optSelect: enxovalOptions[0].value, quantity: 0 }]);
  }

  const addSelect2 = () => {
    setSelects2([...selects2, { optSelect: enxovalOptions[0].value, quantity: 0 ,tag:''}]);
  }

  const addSelect3 = () => {
    setSelects3([...selects3, { optSelect: enxovalOptions[0].value, quantity: 0 }]);
  }

  const updateSelect = (index: number, field: keyof SelectType, value: string | number) => {
    console.log(index)
    console.log(field)
    console.log(value)
    const newSelects = [...selects];
    newSelects[index][field] = value;
    setSelects(newSelects);
  }

  const updateSelect2 = (index: number, field: keyof SelectType, value: string | number) => {
    console.log(index)
    console.log(field)
    console.log(value)
    const newSelects = [...selects2];
    newSelects[index][field] = value;
    setSelects2(newSelects);
  }

  const updateSelect3 = (index: number, field: keyof SelectType, value: string | number) => {
    console.log(index)
    console.log(field)
    console.log(value)
    const newSelects = [...selects3];
    newSelects[index][field] = value;
    setSelects3(newSelects);
  }


  const updateMissSome = (e) => {
    if (e === 'Sim') {
      setMissSome(true);
    } else if (e === 'Não') {
      setMissSome(false);
    }
  }

  const updateManut = (e) => {
    if (e === 'Sim') {
      setManut(true);
    } else if (e === 'Não') {
      setManut(false);
    }
  }
  const addAllObjects = ()=>{
    setSelecteNextTab({
      selects2,
      selects3,
      problems,
      missSome,
      manut,
      
    })
    navigation.navigate('QRCode', {title: route.params.title})
  }
  console.log(selectNextTab)

  return (
    <Container>
      <HeaderContainer>
        <ImageView>
          <Logo source={require("../../Assets/logo.png")} />
        </ImageView>
        <Title>{`${route.params.title} - Outros`}</Title>
      </HeaderContainer>
      <BodyContainer>
        <AddInsideView>
          <Ask>{`Defeito em eletrodomésticos?`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '30%' }} 
            defaultButtonText={'Selecione'} 
            data={yesOrNoOptions} 
            onSelect={(e) => updateMissSome(e)}/>
        </AddInsideView>
        {missSome  && (
          <AskView>
            <InputView>
              <AddView>
                {selects2.map((select, index) => (
                  <AddContainerView key={index}>
                    <AddInsideView>
                      <SelectDropdown 
                        renderDropdownIcon={(isOpen1, index) => {
                          return <ArrowImage source={require("../../Assets/down.png")} />;
                        }}
                        buttonStyle={{ width: '50%' }} 
                        defaultButtonText={'Selecione'} 
                        data={eletronicOptions} 
                        onSelect={(e) => updateSelect2(index, 'optSelect', e)}
                      />
                      <SelectDropdown 
                        renderDropdownIcon={(isOpen2, index) => {
                          return <ArrowImage source={require("../../Assets/down.png")} />;
                        }}
                        buttonStyle={{ width: '50%' }} 
                        defaultButtonText={'Selecionsse'} 
                        data={statusOptions} 
                        onSelect={(e) => updateSelect2(index, 'quantity', e)}
                      />
                    </AddInsideView>
                    <AddInputView>
                      <Ask>{`Número de etiqueta:`}</Ask>
                      <InputQnt onChangeText={(e) => updateSelect2(index, 'tag', e)}/>
                    </AddInputView>
                  </AddContainerView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect2()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          </AskView>
        )}
        <AddInsideView>
          <Ask>{`Necessita manutenção?`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '10%' }} 
            defaultButtonText={'Selecione'} 
            data={yesOrNoOptions} 
            onSelect={(e) => updateManut(e)}/>
        </AddInsideView>
        {manut  && (
          <AskView>
            <InputView>
              <AddView>
                {selects3.map((select, index) => (
                  <AddContainerView key={index}>
                     <AddInsideView key={index}>
                    <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
                      defaultButtonText={'Selecione'} 
                      data={eletronicOptions} 
                      onSelect={(e) => updateSelect3(index, 'optSelect', e)}
                    />
                    <InputQnt onChangeText={(e) => updateSelect3(index, 'quantity', e)}  />
                  </AddInsideView>
                  </AddContainerView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect3()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          </AskView>
        )}
      </BodyContainer>
      <FooterContainer>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
          <Cam>
            <CamImage source={require("../../Assets/cam.png")} />
          </Cam>
          <Voltar onPress={() => addAllObjects()}>Continuar</Voltar>
      </FooterContainer>
    </Container>
  );
};

export default Others;
