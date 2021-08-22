import React from "react";
import { Image, FlatList } from "react-native";

import {
  Container,
  Content,
  HeaderCornerImage,
  HeaderTitle,
  HeaderSubtitle,
  HabitWrapper,
  Separator,
  AddHabitButtonWrapper,
  AddHabitButton,
} from "./styles";

import Habit from "../../components/Habit";

const PatternsImg = require("../../assets/patterns.png");
const PlusImg = require("../../assets/plus.png");

export default function Home() {
  return (
    <Container>
      <FlatList
        data={[
          { name: "Cigar", lastDate: new Date() },
          { name: "Coffee", lastDate: new Date() },
          { name: "Pills", lastDate: new Date() },
          { name: "Drugs", lastDate: new Date() },
          { name: "Alcohol", lastDate: new Date() },
          { name: "Cellphone", lastDate: new Date() },
        ]}
        keyExtractor={(habit) => habit.name}
        renderItem={({ item: habit, index }: { item: any; index: number }) => (
          <HabitWrapper lastHabit={index === 5}>
            <Habit name={habit.name} lastDate={habit.lastDate} />
          </HabitWrapper>
        )}
        ItemSeparatorComponent={() => <Separator />}
        ListHeaderComponent={() => (
          <Content>
            <HeaderCornerImage source={PatternsImg} />

            <HeaderTitle>Seja bem vindo</HeaderTitle>
            <HeaderSubtitle>
              Você tem 3 hábitos a serem quebrados
            </HeaderSubtitle>
          </Content>
        )}
      />

      <AddHabitButtonWrapper>
        <AddHabitButton>
          <Image source={PlusImg} />
        </AddHabitButton>
      </AddHabitButtonWrapper>
    </Container>
  );
}
