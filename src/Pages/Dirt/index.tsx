//@ts-nocheck
import React, {useState} from "react";
import { Ask, AskView, Container, ImageView, Logo, Title, ActionView, Voltar, 
  InputView, InputQnt, Entrar, ButtonLabel, AddView, AddInsideView, HeaderContainer, 
  BodyContainer, FooterContainer, ImageArrow, ArrowImage, Cam, CamImage } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet,View } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; 
import SelectDropdown from 'react-native-select-dropdown';
import api from "../../Services/api";

type SelectType = {
  optSelect: string;
  quantity: number;
};

type OptionType = {
  value: string;
  label: string;
}

const Dirt = ({route}) => {
  const navigation = useNavigation();

  const [stateDirt, setStateDirt] = useState();
  const [problems, setProblems] = useState(false);
  const [missSome, setMissSome] = useState(false);
  const [cleanSome, setCleanSome] = useState(false);

  const [isOpen1, setIsOpen1] = useState(false);
  const [selectNextTab, setSelecteNextTab] = useState();
  const [capture, setCapture] = useState(false);
  const [arrImage, setArrImage] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const addToText = (newText) => {
    setArrImage((prevText) => prevText ? `${prevText};${newText}` : newText);
  };

  const smookingOptions: string[] = [
    'Cheiro',
    'Resíduo',
  ]
  const yesOrNoOptions: string[] = [
    'Sim',
    'Não',
  ]

  const stateOptions: string[] = [
    'Normal',
    'Médio',
    'Alto',
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

  const brokeOptions: OptionType[] = [
    'Copo',
    'Prato',
    'Xícara',
    'Taça',
    'Tampa do vaso',
    'Cama',
    'Secador',
  ]

  const cleanOptions: OptionType[] = [
    'Panela',
    'Tábua de carne',
    'Item de decoração',
  ]

  const [selects, setSelects] = useState<SelectType[]>([
    { optSelect: enxovalOptions[0].value, quantity: 0 }
  ]);

  const [selects2, setSelects2] = useState<SelectType[]>([
    { optSelect: enxovalOptions[0].value, quantity: 0 }
  ]);

  const [selects3, setSelects3] = useState<SelectType[]>([
    { optSelect: brokeOptions[0].value, quantity: 0 }
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

  const updateProblems = (e) => {
   setProblems(e)
  }

  const updateMissSome = (e) => {
    if (e === 'Sim') {
      setMissSome(true);
    } else if (e === 'Não') {
      setMissSome(false);
    }
  }

  const updateCleanSome = (e) => {
    if (e === 'Sim') {
      setCleanSome(true);
    } else if (e === 'Não') {
      setCleanSome(false);
    }
  }

  const addAllObjects = ()=>{
    setSelecteNextTab({
      selects,
      selects2,
      selects3,
      problems,
      missSome,
      cleanSome,
      stateDirt
    })
   objectPut()

   navigation.navigate('Others', {title: route.params.title,id: route.params.id })
  }
 

  const objectPut = async()=>{
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
    var result = joinOptSelects(selects2);
    var result2 = joinOptSelectsQuantity(selects2);
  
    var resultSelect = joinOptSelects(selects3);
    var resultSelect2 = joinOptSelectsQuantity(selects3);
    const cleaning = {
      result,
      result2
    }
    const broke = {
      resultSelect,
      resultSelect2
    }
    let thisDate = new Date();
    thisDate.setHours(thisDate.getHours() - 3);


    const response = await api.put('/incluir_sujeira', {
      checkout_id: route.params.CheckOutId,
      state:stateDirt,
      smoked: problems!==false?true:false,
      smoked_type: problems,
      broked_items: broke.resultSelect,
      cleaning_items:  cleaning.result,
      cleaning_items_number:  cleaning.result2,
      dirt_photo: arrImage
    });
   
   
    navigation.navigate('Others', { title: route.params.title,CheckOutId: route.params.CheckOutId })
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
        formData.append('id', '123'); // substitua pelo valor correto do ID
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
        <Title>{`${route.params.title} - Sujeira`}</Title>
      </HeaderContainer>
      <BodyContainer>
        <AddInsideView>
          <Ask>{`Estado da sujeira`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '30%' }} 
            defaultButtonText={'Selecione'} 
            data={stateOptions} 
            onSelect={(e) => setStateDirt(e)}/>
        </AddInsideView>
        <AddInsideView>
          <Ask>{`Fumou?`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '30%' }} 
            defaultButtonText={'Selecione'} 
            data={yesOrNoOptions} 
            onSelect={(e) => updateProblems(e)}/>
        </AddInsideView>
        <AskView>
          {problems && (
             <AddInsideView>
             <Ask>{`Cheiro ou resíduo?`}</Ask>
             <SelectDropdown 
               renderDropdownIcon={isOpen1 => {
                 return <ArrowImage source={require("../../Assets/down.png")} />;
               }}
               buttonStyle={{ width: '30%' }} 
               defaultButtonText={'Selecione'} 
               data={smookingOptions} 
               onSelect={(e) => updateProblems(e)}/>
           </AddInsideView>
          )}
        </AskView>
        <AddInsideView>
          <Ask>{`Quebrou algo?`}</Ask>
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
                {selects3.map((select, index) => (
                  <AddInsideView key={index}>
                    <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
                      defaultButtonText={'Selecione'} 
                      data={brokeOptions} 
                      onSelect={(e) => updateSelect3(index, 'optSelect', e)}
                    />
                  </AddInsideView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect3()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          </AskView>
        )}
        <AddInsideView>
          <Ask>{`Retirou algo para limpeza?`}</Ask>
          <SelectDropdown 
            renderDropdownIcon={isOpen1 => {
              return <ArrowImage source={require("../../Assets/down.png")} />;
            }}
            buttonStyle={{ width: '30%' }} 
            defaultButtonText={'Selecione'} 
            data={yesOrNoOptions} 
            onSelect={(e) => updateCleanSome(e)}/>
        </AddInsideView>
        {cleanSome  && (
          <AskView>
            <InputView>
              <AddView>
                {selects2.map((select, index) => (
                  <AddInsideView key={index}>
                    <SelectDropdown 
                      renderDropdownIcon={isOpen1 => {
                        return <ArrowImage source={require("../../Assets/down.png")} />;
                      }}
                      buttonStyle={{ width: '65%' }} 
                      defaultButtonText={'Selecione'} 
                      data={cleanOptions} 
                      onSelect={(e) => updateSelect2(index, 'optSelect', e)}
                    />
                    <InputQnt onChangeText={(e) => updateSelect2(index, 'quantity', e)} />
                  </AddInsideView>
                ))}
              </AddView>
              <Entrar onPress={() => addSelect2()}>
                <ButtonLabel>+</ButtonLabel>
              </Entrar>
            </InputView>
          </AskView>
        )}
      </BodyContainer>
      <FooterContainer>
          <Voltar onPress={() => navigation.goBack()}>Voltar</Voltar>
          <Cam onPress={()=>setCapture(true)}>
            <CamImage  source={require("../../Assets/cam.png")}  />
          </Cam>
          <Voltar onPress={() =>addAllObjects()}>Continuar</Voltar>
      </FooterContainer>
    </Container>
  );
};

export default Dirt;
