import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85%;
  width: 100%;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const BodyContainer = styled.ScrollView``;

export const FooterContainer = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const ArrowImage = styled.Image`
  margin-right: 15px;
  width: 15px;
  height: 15px;
`;

export const CamImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Title = styled.Text`
  font-size: 32px;
`;

export const AskView = styled.View`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const Ask = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  margin-left: 15px;
`;

export const InputView = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10px;
`;

export const ActionView = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Voltar = styled.Text`
  font-size: 24px;
`;

export const InputQnt = styled.TextInput`
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 16px;
  border: 1px solid #c3c3c3;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 5px;
  text-transform: lowercase;
`;

export const Entrar = styled.TouchableOpacity`
  background-color: #FF7A2A;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  margin-left: 10px;
`;

export const ButtonLabel = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

export const AddView = styled.View`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const AddInsideView = styled.View`
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  
`;

export const ImageArrow = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

export const Cam = styled.TouchableOpacity`
  background-color: #FF7A2A;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  margin-left: 30px;
`;
