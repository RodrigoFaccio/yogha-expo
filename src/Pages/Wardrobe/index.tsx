//@ts-nocheck
import React, {useState} from "react";
import { Ask, AskView, Container, ImageView, Logo, Title, ActionView, Voltar, 
  InputView, InputQnt, Entrar, ButtonLabel, AddView, AddInsideView, HeaderContainer, 
  BodyContainer, FooterContainer, ImageArrow, ArrowImage, Cam, CamImage } from "./styles";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import api from "../../Services/api";
import { Alert, StyleSheet,View } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; // Importação atualizada
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
  const [capture, setCapture] = useState(false);
  const [arrImage, setArrImage] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const addToText = (newText) => {
    setArrImage((prevText) => prevText ? `${prevText};${newText}` : newText);
  };

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
  const enxovalOptionsType: OptionType[] = [
    'Manchou',
    'Rasgou',
    
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
  var used = joinOptSelects(selects);
  var usedCoutn = joinOptSelectsQuantity(selects);

  var missing = joinOptSelects(selects2);
  var missingCount = joinOptSelectsQuantity(selects2);

  var problem = joinOptSelects(selects3);
  var problemCount = joinOptSelectsQuantity(selects3);


  
  const startChekOut =async ()=>{
    let thisDate = new Date();
    thisDate.setHours(thisDate.getHours() - 3);


    const result = await api.put('/incluir_enxoval', {
      checkout_id: route.params.CheckOutId,
      wardrobe_used: used,
      wardrobe_used_count: usedCoutn,
      wardrobe_missing: missing,
      wardrobe_missing_count: missingCount,
      wardrobe_problem: problem,
      wardrobe_problem_type: problemCount,
      coast: route.params.prioridade?30:25,
      wardrobe_photo: arrImage
    });
    console.log({
      checkout_id: route.params.CheckOutId,
      wardrobe_used: used,
      wardrobe_used_count: usedCoutn,
      wardrobe_missing: missing,
      wardrobe_missing_count: missingCount,
      wardrobe_problem: problem,
      wardrobe_problem_type: problemCount,
      coast: route.params.prioridade?30:25,
      wardrobe_photo: arrImage
    })
   
    navigation.navigate('Dirt', { title: route.params.title,CheckOutId: route.params.CheckOutId })

  }
  const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      width: '100%',
      height: '85%',
    },
  });
  const handleCapturePhoto = async () => {
    if (cameraRef) {
      try {
        const {uri} = await cameraRef.takePictureAsync();

        if (uri) {
          if (Platform.OS === 'ios') {
           await MediaLibrary.requestPermissionsAsync();

          }
         await MediaLibrary.saveToLibraryAsync(uri);
          uploadPhoto(uri)
        
          Alert.alert('Foto salva com sucesso!');
          setCapture(false)
        }
      } catch (error) {
        console.log('Erro ao capturar foto:', error);
      }
    }
  };
 
  const uploadPhoto = async (photoUri) => {
    const apiUrl = 'https://dev.yogha.com.br/api/mobile-operational/set-image'; // URL da API de upload
  
      try {
        const formData = new FormData();
        formData.append('id',String(route.params.CheckOutId)); // substitua pelo valor correto do ID
        formData.append('file', {
          uri:photoUri,
          type: 'image/jpeg', // ajuste o tipo de acordo com o formato da imagem
          name: 'photo.jpg', // ajuste o nome do arquivo conforme necessário
        });
      console.log(JSON.stringify(formData));

  
      const response = await api.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Foto enviada com sucesso:', response.data);
      addToText(response.data.link)
      } catch (error) {
        console.log(error)
      }
   
  };

  if(capture){
    return(
     <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)} />
      <Cam onPress={handleCapturePhoto}>

    <CamImage source={require("../../Assets/cam.png")}  />
    </Cam>
     </View>

    )
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
            buttonStyle={{ width: '50%' }} 

                      defaultButtonText={'Selecione'} 
                      data={enxovalOptions} 
                      onSelect={(e) => updateSelect3(index, 'optSelect', e)}
                      />
                      <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
            buttonStyle={{ width: '50%' }} 

                      defaultButtonText={'Selecione'} 
                      data={enxovalOptionsType} 
                      onSelect={(e) => updateSelect3(index, 'quantity', e)}
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
          <Cam  onPress={()=>setCapture(true)}>
            <CamImage source={require("../../Assets/cam.png")} />
          </Cam>
          <Voltar onPress={() =>startChekOut()}>Continuar</Voltar>
      </FooterContainer>
    </Container>
  );
};

export default Wardrobe;
