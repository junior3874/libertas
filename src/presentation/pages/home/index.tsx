import React from "react";
import { Image, Text, View } from "react-native";

import {
  Container,
  Content,
  HeaderCornerImage,
  HeaderTitle,
  HeaderSubtitle,
  AddHabitButtonWrapper,
  AddHabitButton,
} from "./styles";

import Habit from "../../components/Habit";

const PatternsImg = require("../../assets/patterns.png");
const PlusImg = require("../../assets/plus.png");

export default function Home() {
  return (
    <Container>
      <Content>
        <HeaderCornerImage source={PatternsImg} />

        <HeaderTitle>Seja bem vindo</HeaderTitle>
        <HeaderSubtitle>Você tem 3 hábitos a serem quebrados</HeaderSubtitle>
      </Content>

      <Habit name="Cigarro" lastDate={new Date()} />
      <Habit name="Café" lastDate={new Date()} />

      <AddHabitButtonWrapper>
        <AddHabitButton>
          <Image source={PlusImg} />
        </AddHabitButton>
      </AddHabitButtonWrapper>
    </Container>
  );
}
