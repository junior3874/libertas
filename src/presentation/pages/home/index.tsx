import React, { useContext } from "react";
import { Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Content,
  HeaderCornerImage,
  HabitWrapper,
  Separator,
  AddHabitButtonWrapper,
  AddHabitButton,
} from "./styles";

import Habit from "../../components/Habit";
import HeaderText from "../../components/HeaderText";
import { HabitContext } from "../../context/habit";

const PatternsImg = require("../../assets/patterns.png");
const PlusImg = require("../../assets/plus.png");

export default function Home() {
  const { habits } = useContext(HabitContext);
  const navigation = useNavigation();

  function navigateTo(pageName: string, params = {}): void {
    navigation.navigate(pageName as never, params as never);
  }

  return (
    <Container>
      <FlatList
        data={habits}
        keyExtractor={(habit) => habit.name}
        renderItem={({ item: habit, index }: { item: any; index: number }) => (
          <HabitWrapper lastHabit={index === habits.length}>
            <Habit
              name={habit.name}
              lastDate={habit.performedLastDate}
              onPress={() => navigateTo("Habit", habit)}
              onMorePress={() => navigateTo("UpdateHabit")}
            />
          </HabitWrapper>
        )}
        ItemSeparatorComponent={() => <Separator />}
        ListHeaderComponent={() => (
          <Content>
            <HeaderCornerImage source={PatternsImg} />

            <HeaderText.Title message="Seja bem vindo" />
            <HeaderText.Subtitle message="Você tem 3 hábitos a serem quebrados" />
          </Content>
        )}
      />

      <AddHabitButtonWrapper>
        <AddHabitButton onPress={() => navigateTo("CreateHabit")}>
          <Image source={PlusImg} />
        </AddHabitButton>
      </AddHabitButtonWrapper>
    </Container>
  );
}
