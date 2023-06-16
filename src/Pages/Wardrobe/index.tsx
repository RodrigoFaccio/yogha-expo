//@ts-nocheck
import React, {useState} from "react";
import { Ask, AskView, Container, ImageView, Logo, Title, ActionView, Voltar, 
  InputView, InputQnt, Entrar, ButtonLabel, AddView, AddInsideView, HeaderContainer, 
  BodyContainer, FooterContainer, ImageArrow, ArrowImage, Cam, CamImage } from "./styles";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';

type SelectType = {
  optSelect: string;
  quantity: number;
};

type OptionType = {
  value: string;
  label: string;
}

const Wardrobe = ({route}) => {
  const navigation = useNavigation();

  const [missSome, setMissSome] = useState(false);
  const [problems, setProblems] = useState(false);

  const [isOpen1, setIsOpen1] = useState(false);
  const [selectNextTab, setSelecteNextTab] = useState();


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
    setSelects2([...selects2, { optSelect: enxovalOptions[0].value, quantity: 0 }]);
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
    console.log( index)
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

  const updateProblems = (e) => {
    if (e === 'Sim') {
      setProblems(true);
    } else if (e === 'Não') {
      setProblems(false);
    }
  }

  const addAllObjects = ()=>{
    setSelecteNextTab({
      selects,
      selects2,
      selects3
    })
  objectPut()

    navigation.navigate('Dirt', {title: route.params.title})
  }
  function joinOptSelects(items) {
    var optSelects = items.map(function(item) {
      return item.optSelect;
    });
    var joinedString = optSelects.join(';');
    return joinedString+';';
  }

  function joinOptSelectsQuantity(items) {
    var optSelects = items.map(function(item) {
      return item.quantity;
    });
    var joinedString = optSelects.join(';');
    return joinedString+';';
  }
  var resultSelect = joinOptSelects(selects);
  var resultSelect2 = joinOptSelectsQuantity(selects);

  var resultSelect3 = joinOptSelects(selects2);
  var resultSelect4 = joinOptSelectsQuantity(selects2);

  var resultSelect5 = joinOptSelects(selects3);

  const objectPut = ()=>{
    
    const quebrou ={
      resultSelect,
      resultSelect2,
      resultSelect3,
      resultSelect4,
      resultSelect5,
    }
   console.log(quebrou)

  }




  return (
    <Container>
      <HeaderContainer>
        <ImageView>
          <Logo source={require("../../Assets/logo.png")} />
        </ImageView>
        <Title>{`${route.params.title} - Enxoval`}</Title>
      </HeaderContainer>
      <BodyContainer>
        <AskView>
          <Ask>{`Quantas peças retiradas?`}</Ask>
        </AskView>
        <InputView>
          <AddView>
            {selects.map((select, index) => (
              <AddInsideView key={index}>
                <SelectDropdown 
                  renderDropdownIcon={isOpen1 => {
                    return <ArrowImage source={require("../../Assets/down.png")} />;
                  }}
                  defaultButtonText={'Selecione'} data={enxovalOptions} onSelect={(e) => updateSelect(index, 'optSelect', e)}
                />
                <InputQnt onChangeText={(e) => updateSelect(index, 'quantity', e)} />
              </AddInsideView>
            ))}
          </AddView>
            <Entrar onPress={() => addSelect()}>
              <ButtonLabel>+</ButtonLabel>
            </Entrar>
        </InputView>
        <AddInsideView>
          <Ask>{`Faltou algo?`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '40%' }} 
            defaultButtonText={'Selecione'} 
            data={yesOrNoOptions} 
            onSelect={(e) => updateMissSome(e)}/>
        </AddInsideView>
        {missSome  && (
          <AskView>
            <InputView>
              <AddView>
                {selects2.map((select, index) => (
                  <AddInsideView key={index}>
                    <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
                      defaultButtonText={'Selecione'} 
                      data={enxovalOptions} 
                      onSelect={(e) => updateSelect2(index, 'optSelect', e)}
                    />
                    <InputQnt onChangeText={(e) => updateSelect2(index, 'quantity', e)}  />
                  </AddInsideView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect2()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          </AskView>
        )}
        <AskView>
          <AddInsideView>
            <Ask>{`Problemas com enxoval?`}</Ask>
            <SelectDropdown 
              renderDropdownIcon={isOpen1 => {
                return <ArrowImage source={require("../../Assets/down.png")} />;
              }}
              buttonStyle={{ width: '40%' }} 
              defaultButtonText={'Selecione'} 
              data={yesOrNoOptions} onSelect={(e) => updateProblems(e)}
            />
          </AddInsideView>
          {problems && (
            <InputView>
              <AddView>
                {selects3.map((select, index) => (
                  <AddInsideView key={index}>
                    <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
                      defaultButtonText={'Selecione'} 
                      data={enxovalOptions} 
                      onSelect={(e) => updateSelect3(index, 'optSelect', e)}
                      />
                  </AddInsideView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect3()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          )}
        </AskView>
      </BodyContainer>
      <FooterContainer>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
          <Cam>
            <CamImage source={require("../../Assets/cam.png")} />
          </Cam>
          <Voltar onPress={() =>addAllObjects()}>Continuar</Voltar>
      </FooterContainer>
    </Container>
  );
};

export default Wardrobe;
