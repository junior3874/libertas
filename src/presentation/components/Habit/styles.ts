import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background: #1f1f1f;
  border-radius: 3px;
`;

export const FlexContent = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
`;

export const ImageHabit = styled.Image``;

export const HabitInformationArea = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;

export const HabitInformationText = styled.Text`
  margin-bottom: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  color: #ffffff;
`;

export const HabitInformationLastDate = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #6410e6;
`;

export const HabitOptionsArea = styled.TouchableOpacity`
  height: 100%;
  margin-left: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;
