import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background: #1f1f1f;
  border-radius: 3px;
`;

export const ImageHabitArea = styled.View``;
export const ImageHabit = styled.Image``;

export const HabitInformationArea = styled.View``;
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

  /* identical to box height */

  color: #6410e6;
`;

export const HabitOptionsArea = styled.View`
  height: 100%;
  margin-top: -20px;
  margin-right: -5px;
`;
export const HabitOptionsImage = styled.Image``;
