import React from "react";
import BtnGeneric from "../../components/btnGeneric";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";

import {
  Container,
  TimeElapsedContainer,
  TimeElapsedBoxPairContainer,
  TimeElapsedBoxWrapper,
  TimeElapsedBox,
  TimeElapsedTitle,
  TimeElapsedCount,
} from "./styles";

export default function Habit() {
  return (
    <Container>
      <GoBackButton />

      <HeaderText.Title message="Sobre o hábito" />
      <HeaderText.Subtitle message="Há quanto tempo você está sóbrio" />

      <TimeElapsedContainer>
        <TimeElapsedBoxPairContainer>
          <TimeElapsedBoxWrapper>
            <TimeElapsedBox>
              <TimeElapsedTitle>Dias</TimeElapsedTitle>
              <TimeElapsedCount>3</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>

          <TimeElapsedBoxWrapper isRightSideElement>
            <TimeElapsedBox isRightSideElement>
              <TimeElapsedTitle>Horas</TimeElapsedTitle>
              <TimeElapsedCount>7</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>
        </TimeElapsedBoxPairContainer>

        <TimeElapsedBoxPairContainer applyMarginTop>
          <TimeElapsedBoxWrapper>
            <TimeElapsedBox>
              <TimeElapsedTitle>Minutos</TimeElapsedTitle>
              <TimeElapsedCount>23</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>

          <TimeElapsedBoxWrapper isRightSideElement>
            <TimeElapsedBox isRightSideElement>
              <TimeElapsedTitle>Segundos</TimeElapsedTitle>
              <TimeElapsedCount>13</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>
        </TimeElapsedBoxPairContainer>
      </TimeElapsedContainer>

      <BtnGeneric
        title="Resetar tempo"
        onPress={() => {}}
        backgroundColor="#6410E6"
      />
    </Container>
  );
}
