//@ts-nocheck
import React, { useState, useEffect } from 'react';

import { ActionView, ButtonLabel, Container, Entrar, ImageView, Logo, Title, Voltar, CamImage } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../Services/api';

const QRCode = ({route}) => {
  const navigation = useNavigation();
  console.log(route.params.CheckOutId);
  const [qrcodeTrue,setQrCodeTrue] = useState(false)
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  const styles = StyleSheet.create({
    cameraContainer: {
      width:'100%',
      height:'100%',
     
    },
    
  });
  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    let thisDate = new Date();
    thisDate.setHours(thisDate.getHours() - 3);


   
    if(data===route.params.title){
      console.log( Number(route.params.CheckOutId))
      const result = await api.post('/finalizar_limpeza', {
        finished_at: thisDate,
        id_checkout: Number(route.params.CheckOutId),
      });
      navigation.navigate('Checkout')
    }
   
  };

  if(qrcodeTrue){
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
           
        </BarCodeScanner>
      </View>
    );
  }
  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
        <Title>{'Ler QRCode'}</Title>
        <ActionView>
          <Entrar onPress={()=>setQrCodeTrue(true)}>
            <CamImage source={require("../../Assets/cam.png")} />
          </Entrar>
          <Voltar onPress={() => navigation.navigate('Others', {title: route.params.title})}>Voltar</Voltar>
        </ActionView>
    </Container>
  );
};

export default QRCode;
