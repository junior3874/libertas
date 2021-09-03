import React, { useState, useContext, useRef } from "react";
import { View, Keyboard, Animated, TouchableOpacity } from "react-native";

import { HabitContext } from "../../context/habit";

import Form from "../../components/Form";
import HeaderText from "../../components/HeaderText";
import GoBackButton from "../../components/GoBackButton";
import BtnGeneric from "../../components/btnGeneric";

import { Container, FormWrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { defaultHabitOptions } from "../../lib/defaultHabits";

export default function CreateHabit({}) {
  const navigation = useNavigation();

  //==================================================================
  // Context
  //==================================================================

  const { addHabit } = useContext(HabitContext);

  //==================================================================
  // States
  //==================================================================

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [lastDate, setLastDate] = useState<Date>();
  const [calendarVisible, setCalendarVisible] = useState(false);

  //==================================================================
  // Handlers
  //==================================================================

  const onCreateHabit = async () => {
    const response = await addHabit({
      name,
      performedLastDate: lastDate!,
    });
    if (!response.error) {
      navigation.goBack();
    }
  };

  const setNewDate = (date: Date) => {
    setDate(date);
    setLastDate(date);
  };
  const closeCalendar = () => setCalendarVisible(false);
  const openCalendar = () => {
    setCalendarVisible(true);
  };

  return (
    <Container
      onPress={() => {
        setIsDropdownOpen(false);
        Keyboard.dismiss();
      }}
      activeOpacity={1}
    >
      <GoBackButton />

      <HeaderText.Title message="Criar novo hábito" />
      <HeaderText.Subtitle message="Escolha uma das opções de hábitos" />

      <FormWrapper>
        <Form.Label message="Qual hábito você quer enfrentar" />
        <Form.DropdownWrapper>
          <Form.Dropdown
            title="Selecione um hábito"
            options={defaultHabitOptions}
            isDropdownOpen={isDropdownOpen}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            onSelectedOptionChange={(event) => setName(event)}
            option={name}
          />
        </Form.DropdownWrapper>

        <View style={{ height: 36 }} />

        <Form.Label message="Última vez que você se rendeu a este hábito" />

        <Form.DateInput
          onPress={openCalendar}
          value={date}
          setLastDate={setNewDate}
          visible={calendarVisible}
          setIsVisible={closeCalendar}
        />
      </FormWrapper>

      <View style={{ height: 60 }} />
      <BtnGeneric
        title="Criar novo hábito"
        backgroundColor="#6410E6"
        onPress={() => onCreateHabit()}
      />
    </Container>
  );
}
