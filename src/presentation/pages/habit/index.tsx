import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import BtnGeneric from "../../components/btnGeneric";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";
import { HabitContext } from "../../context/habit";
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
  const { updateHabit, showHabit } = useContext(HabitContext);
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamList, "Habit">>();
  const [habit, setHabit] = useState({
    name: route.params.name,
    performedLastDate: route.params.performedLastDate,
  });
  const [timeElapsed, setTimeElapsed] = useState<TimeSince>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchHabit = useCallback(async () => {
    if (route.params.name) {
      const habit = await showHabit(route.params.name);
      setHabit(habit);
    }
  }, [route, showHabit]);

  useEffect(() => {
    (async () => {
      await fetchHabit();
    })();
  }, [habit]);

  useEffect(() => {
    clearInterval(callFunctionToGetTimeElapsedInterval);

    const { performedLastDate } = habit;
    if (performedLastDate) {
      setTimeElapsed(getTimeSince(performedLastDate));
      callFunctionToGetTimeElapsedInterval = setInterval(
        () => setTimeElapsed(getTimeSince(performedLastDate)),
        1000
      );
    }
  }, [habit]);

  useEffect(() => {
    if (!isFocused) {
      clearInterval(callFunctionToGetTimeElapsedInterval);
    }
  }, [isFocused]);

  async function resetTimer() {
    const { name } = route.params;
    await updateHabit({
      currentName: name,
      performedLastDate: new Date(),
    });
  }

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
        onPress={resetTimer}
        backgroundColor="#6410E6"
      />
    </Container>
  );
}
