import styled from "styled-components/native";

export const Container = styled.View`
  background: #141414;
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TimeElapsedContainer = styled.View`
  margin-top: 80px;
  margin-bottom: 36px;
`;

type TimeElapsedBoxPairContainerProps = {
  applyMarginTop?: true;
};

export const TimeElapsedBoxPairContainer = styled.View<TimeElapsedBoxPairContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ applyMarginTop }) => (applyMarginTop ? "12px" : "0")};
`;

type IsRightSideElementProps = {
  isRightSideElement?: true;
};

export const TimeElapsedBoxWrapper = styled.View<IsRightSideElementProps>`
  width: 50%;
  margin-left: ${({ isRightSideElement }) =>
    isRightSideElement ? "12px" : "-6px"};
  padding-right: 6px;
`;

export const TimeElapsedBox = styled.View<IsRightSideElementProps>`
  background: #1f1f1f;
  elevation: 20;
  width: 100%;
  padding-left: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: ${({ isRightSideElement }) =>
    !isRightSideElement ? "6px" : "0"};
  border-radius: 4px;
`;

export const TimeElapsedTitle = styled.Text`
  font-size: 16px;
  color: #ffffff;

  font-family: Poppins_400Regular;
`;

export const TimeElapsedCount = styled.Text`
  margin-top: 14px;
  font-size: 26px;
  color: #6410e6;

  font-family: Poppins_600SemiBold;
`;
