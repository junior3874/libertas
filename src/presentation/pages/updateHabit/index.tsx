import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import BtnGeneric from "../../components/btnGeneric";
import Form from "../../components/Form";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";
import { HabitContext } from "../../context/habit";
import { defaultHabitOptions } from "../../lib/defaultHabits";
import { StackParamList } from "../../routes";

import { Container, FormWrapper, EditButtonWrapper } from "./styles";

export default function UpdateHabit() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, "UpdateHabit">>();
  //==================================================================
  // Contexts
  //==================================================================

  const { updateHabit, removeHabit } = useContext(HabitContext);

  //==================================================================
  // States
  //==================================================================

  const [name, setName] = useState("");
  const [lastDate, setLastDate] = useState<Date | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);

  //==================================================================
  // Handlers
  //==================================================================

  async function onUpdateHabit() {
    await updateHabit({
      currentName: route.params.currentName,
      newName: name,
      performedLastDate: lastDate,
    });
    navigation.goBack();
  }

  async function onRemoveHabit() {
    await removeHabit(route.params.currentName);
    navigation.goBack();
  }

  const _setLastDate = (date: Date) => {
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
      <HeaderText.Title message="Editar hábito" />
      <HeaderText.Subtitle message="Escolha qual opção você quer editar" />
      <FormWrapper>
        <Form.Label message="Qual hábito você quer enfrentar?" />
        <Form.DropdownWrapper>
          <Form.Dropdown
            title="Selecione um hábito"
            options={defaultHabitOptions}
            isDropdownOpen={isDropdownOpen}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            onSelectedOptionChange={(selectedOption) => setName(selectedOption)}
            option={name}
          />
        </Form.DropdownWrapper>

        <View style={{ height: 36 }} />

        <Form.Label message="Última vez que você se rendeu a este hábito" />
        <Form.DateInput
          onPress={openCalendar}
          value={date}
          setLastDate={_setLastDate}
          visible={calendarVisible}
          setIsVisible={closeCalendar}
        />
      </FormWrapper>
      <EditButtonWrapper>
        <BtnGeneric
          backgroundColor="#6410E6"
          onPress={onUpdateHabit}
          title="Editar hábito"
        />
      </EditButtonWrapper>

      <BtnGeneric
        backgroundColor="#D62828"
        onPress={onRemoveHabit}
        title="Excluir hábito"
      />
    </Container>
  );
}
