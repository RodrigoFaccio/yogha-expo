import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ImageView = styled.View`
  width: 200px;
  height: 70px;
  margin-bottom: 30px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Label = styled.Text`
  color: black;
  font-size: 18px;
  margin-bottom: 5px;
  margin-left: 3px;
`;

export const LabelError = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ButtonLabel = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

export const InputEmail = styled.TextInput`
  width: 300px;
  height: 50px;
  border: 1px solid #c3c3c3;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 5px;
  text-transform: lowercase;
`;

export const InputPass = styled.TextInput`
  width: 300px;
  height: 50px;
  border: 1px solid #c3c3c3;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const Entrar = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #FF7A2A;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
`;
