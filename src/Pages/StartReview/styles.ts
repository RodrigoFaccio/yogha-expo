import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 100%;
`;

export const ImageView = styled.View`
  height: 100px;
`;

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-size: 32px;
`;

export const Voltar = styled.Text`
  font-size: 24px;
`;

export const Entrar = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #FF7A2A;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const ButtonLabel = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

export const ActionView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
