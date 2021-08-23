import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BtnGeneric from "../../components/btnGeneric";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";
import { StackParamList } from "../../routes";

import {
  Container,
  TimeElapsedContainer,
  TimeElapsedBoxPairContainer,
  TimeElapsedBoxWrapper,
  TimeElapsedBox,
  TimeElapsedTitle,
  TimeElapsedCount,
} from "./styles";
import { getTimeSince, TimeSince } from "./utils/getTimeSince";

let callFunctionToGetTimeElapsedInterval: any = null;

export default function Habit() {
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamList, "Habit">>();
  const [timeElapsed, setTimeElapsed] = useState<TimeSince>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    clearInterval(callFunctionToGetTimeElapsedInterval);

    const { performedLastDate } = route.params;
    if (performedLastDate) {
      setTimeElapsed(getTimeSince(performedLastDate));
      callFunctionToGetTimeElapsedInterval = setInterval(
        () => setTimeElapsed(getTimeSince(performedLastDate)),
        1000
      );
    }
  }, [route]);

  useEffect(() => {
    if (!isFocused) {
      clearInterval(callFunctionToGetTimeElapsedInterval);
    }
  }, [isFocused]);

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
              <TimeElapsedCount>{timeElapsed.days}</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>

          <TimeElapsedBoxWrapper isRightSideElement>
            <TimeElapsedBox isRightSideElement>
              <TimeElapsedTitle>Horas</TimeElapsedTitle>
              <TimeElapsedCount>{timeElapsed.hours}</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>
        </TimeElapsedBoxPairContainer>

        <TimeElapsedBoxPairContainer applyMarginTop>
          <TimeElapsedBoxWrapper>
            <TimeElapsedBox>
              <TimeElapsedTitle>Minutos</TimeElapsedTitle>
              <TimeElapsedCount>{timeElapsed.minutes}</TimeElapsedCount>
            </TimeElapsedBox>
          </TimeElapsedBoxWrapper>

          <TimeElapsedBoxWrapper isRightSideElement>
            <TimeElapsedBox isRightSideElement>
              <TimeElapsedTitle>Segundos</TimeElapsedTitle>
              <TimeElapsedCount>{timeElapsed.seconds}</TimeElapsedCount>
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
