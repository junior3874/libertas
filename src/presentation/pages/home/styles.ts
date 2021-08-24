import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #141414;
`;

export const Content = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 52px;
  margin-bottom: 52px;
`;

export const HeaderCornerImage = styled.Image`
  position: absolute;
  top: -77px;
  right: -42px;
`;

type HabitWrapperProps = {
  lastHabit: boolean;
};

export const HabitWrapper = styled.View<HabitWrapperProps>`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: ${({ lastHabit }) => (lastHabit ? "116px" : "0")};
`;

export const Separator = styled.View`
  height: 16px;
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
