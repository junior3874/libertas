import styled from "styled-components/native";

type BtnProps = {
  backgroundColor: string;
};
export const Container = styled.TouchableOpacity<BtnProps>`
  height: 70px;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

export const BtnTitle = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
`;
