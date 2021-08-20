import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #141414;
`;

export const Content = styled.View`
  padding: 16px;
  padding-top: 52px;
`;

export const HeaderCornerImage = styled.Image`
  position: absolute;
  top: -77px;
  right: -42px;
`;

export const HeaderTitle = styled.Text`
  color: #6410e6;
  font-size: 26px;
`;

export const HeaderSubtitle = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-top: 6px;
`;

export const AddHabitButtonWrapper = styled.View`
  position: absolute;
  bottom: 32px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const AddHabitButton = styled.TouchableOpacity`
  background-color: #6410e6;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
