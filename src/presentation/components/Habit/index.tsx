import React from "react";
import { Image } from "react-native";
import {
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";

import { ptBR } from "date-fns/locale";

import {
  Container,
  FlexContent,
  ImageHabit,
  HabitInformationArea,
  HabitInformationText,
  HabitInformationLastDate,
  HabitOptionsArea,
} from "./styles";

const Pill = require("../../assets/pill.png");
const Cigar = require("../../assets/cigar.png");
const Coffe = require("../../assets/coffee.png");
const Other = require("../../assets/other.png");
const MoreImg = require("../../assets/more.png");

type HabitProps = {
  name: string;
  lastDate: Date;
  onPress(): void;
  onMorePress(): void;
};

export default function Habit({
  name,
  lastDate,
  onPress,
  onMorePress,
}: HabitProps) {
  const getDistanceCurrentDataBetweenLastDate = intervalToDuration({
    start: lastDate,
    end: new Date(),
  });

  const distance = formatDuration(
    { ...getDistanceCurrentDataBetweenLastDate },
    { locale: ptBR }
  );

  return (
    <Container onPress={onPress}>
      <FlexContent>
        <ImageHabit source={Cigar} />
        <HabitInformationArea>
          <HabitInformationText>
            Você está a 5 dias sem {name}
          </HabitInformationText>
          <HabitInformationLastDate>{distance}</HabitInformationLastDate>
        </HabitInformationArea>
      </FlexContent>
      <HabitOptionsArea onPress={onMorePress}>
        <Image source={MoreImg} />
      </HabitOptionsArea>
    </Container>
  );
}
