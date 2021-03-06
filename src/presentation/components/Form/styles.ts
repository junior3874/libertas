import styled from "styled-components/native";

import { Animated } from "react-native";

type DropdownProps = {
  marginTop: number;
};

export const Container = styled.View`
  width: 100%;
  position: absolute;
  z-index: 1;
  overflow: hidden;
`;

export const ContainerWrapper = styled.View`
  position: relative;
`;

export const DropdownWrapper = styled.View`
  position: relative;
  height: 50px;
`;

export const TitleArea = styled.TouchableOpacity`
  height: 50px;
  background-color: #1f1f1f;
  border: 1px solid #6410e6;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

export const TitleName = styled.Text`
  font-family: Poppins_400Regular;
  font-size: 14px;
  line-height: 21px;
  color: #858585;
`;

export const DropdownArea = styled(Animated.View)`
  background: #1f1f1f;
  border: 1px solid #2c2c2c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  width: 100%;
  position: relative;
  z-index: -1;
  margin-top: 5px;
`;

export const LabelTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: white;
  margin-bottom: 12px;

  font-family: Poppins_400Regular;
`;

export const PersonalizedOptionArea = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;
export const PersonalizedOptionCloseArea = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
`;
export const PersonalizedOptionCloseImg = styled.Image``;

export const PersonalizedOptionInput = styled.TextInput`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  color: white;
  padding: 0 15px;

  font-family: Poppins_400Regular;
`;

export const ModalPressable = styled.Pressable``;
