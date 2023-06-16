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
  margin-bottom: 10px;
`;

export const ButtonLabel = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;
