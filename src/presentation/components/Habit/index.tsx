import React from "react";
import {
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";

import { ptBR } from "date-fns/locale";

import {
  Container,
  ImageHabitArea,
  ImageHabit,
  HabitInformationArea,
  HabitInformationText,
  HabitInformationLastDate,
  HabitOptionsArea,
  HabitOptionsImage,
} from "./styles";

const Pill = require("../../assets/pill.png");
const Cigar = require("../../assets/cigar.png");
const Coffe = require("../../assets/coffee.png");
const Other = require("../../assets/other.png");
const Plus = require("../../assets/plus.png");

type HabitProps = {
  name: string;
  lastDate: Date;
};

export default function Habit({ name, lastDate }: HabitProps) {
  const getDistanceCurrentDataBetweenLastDate = intervalToDuration({
    start: lastDate,
    end: new Date(),
  });
  const distance = formatDuration(
    { ...getDistanceCurrentDataBetweenLastDate },
    { locale: ptBR }
  );
  return (
    <Container>
      <ImageHabitArea>
        <ImageHabit source={Other} />
      </ImageHabitArea>
      <HabitInformationArea>
        <HabitInformationText>
          Você está a 5 dias sem {name}
        </HabitInformationText>
        <HabitInformationLastDate>{`${distance}`}</HabitInformationLastDate>
      </HabitInformationArea>
      <HabitOptionsArea>
        <HabitOptionsImage source={Plus} />
      </HabitOptionsArea>
    </Container>
  );
}
