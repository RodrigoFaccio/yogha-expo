import React, { useState } from "react";
import {
  ButtonLabel,
  Container,
  Entrar,
  ImageView,
  InputContainer,
  InputEmail,
  InputPass,
  Label,
  LabelError,
  Logo,
} from "./styles";
import api from "../../Services/api";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");

  const handleLogin = async () => {
     if (email === "" || document === "") {
       setError(true);
     } else {
       try {
         const response = await api.post("/login", {
           email,
           document,
         });
         console.log(response);
         if (response.data.result[0].name !== "") {
          navigation.navigate('Home');
         }
       } catch (err) {
         setError(true);
       }
     }
  };

  return (
    <Container>
      <ImageView>
        <Logo source={require("../../Assets/logo.png")} />
      </ImageView>
      <InputContainer>
        <Label>E-mail</Label>
        <InputEmail
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
        />
        <Label>Senha</Label>
        <InputPass
          value={document}
          onChangeText={setDocument}
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </InputContainer>
      {error && <LabelError>Usuário ou senha incorretos.</LabelError>}
      <Entrar onPress={() => handleLogin()}>
        <ButtonLabel>Entrar</ButtonLabel>
      </Entrar>
    </Container>
  );
};

export default Login;
