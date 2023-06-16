import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 100px;
`;

export const ListContainer = styled.View`
  margin-top: -30px;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export const ListTitle = styled.View`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
`;

export const ListView = styled.View``;

export const ScrollList = styled.ScrollView`
  width: 80%;
  margin-bottom: 100px;
  margin-top: 10px;
`;

export const ImageView = styled.View`
  width: 200px;
  height: 70px;
  margin-top: -30px;
`;

export const ImageArrow = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
`;

export const ImageFake = styled.View`
  width: 30px;
  height: 30px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const LabelTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const LabelTrue = styled.Text`
  padding: 5px;
  width: 80%;
  font-size: 16px;
  background-color: #FF7A2A;
  margin-bottom: 20px;
  margin-left: 20px;
`;

export const LabelFalse = styled.Text`
  padding: 5px;
  width: 80%;
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 20px;
  background-color: #c3c3c3;
`;

export const ListViewSelect = styled.TouchableOpacity``;