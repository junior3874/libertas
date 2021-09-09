import React, { useContext } from "react";
import * as Localization from "expo-localization";
import { Image } from "react-native";
import {
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";

import { ptBR, enUS } from "date-fns/locale";

import {
  Container,
  FlexContent,
  ImageHabit,
  HabitInformationArea,
  HabitInformationText,
  HabitInformationLastDate,
  HabitOptionsArea,
} from "./styles";
import { defaultHabitOptions } from "../../lib/defaultHabits";
import { LanguageContext } from "../../context/language";

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

const dateFnsLocales = {
  "pt-BR": ptBR,
  pt: ptBR,
  "en-US": enUS,
  en: enUS,
} as { [key: string]: any };

export default function Habit({
  name,
  lastDate,
  onPress,
  onMorePress,
}: HabitProps) {
  const { language } = useContext(LanguageContext);

  const getDistanceCurrentDataBetweenLastDate = intervalToDuration({
    start: lastDate,
    end: new Date(),
  });

  const distance = formatDuration(
    { ...getDistanceCurrentDataBetweenLastDate },
    { locale: dateFnsLocales[Localization.locale] }
  );

  const image =
    defaultHabitOptions.find((element) => element.title == name)?.img || Other;

  return (
    <Container onPress={onPress}>
      <FlexContent>
        <ImageHabit source={image} />
        <HabitInformationArea>
          <HabitInformationText>
            {language.getHabitComponentTitleMessage(name)}
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
