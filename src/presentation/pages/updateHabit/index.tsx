import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { useState } from "react";
import { View } from "react-native";
import BtnGeneric from "../../components/btnGeneric";
import Form from "../../components/Form";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";
import { HabitContext } from "../../context/habit";
import { StackParamList } from "../../routes";

import { Container, FormWrapper, EditButtonWrapper } from "./styles";

export default function UpdateHabit() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, "UpdateHabit">>();
  const { updateHabit, removeHabit } = useContext(HabitContext);
  const [name, setName] = useState("");
  const [lastDate, setLastDate] = useState<Date | null>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function onUpdateHabit() {
    await updateHabit({
      currentName: route.params.currentName,
      newName: name,
      performedLastDate: new Date(),
    });
    navigation.goBack();
  }

  async function onRemoveHabit() {
    await removeHabit(route.params.currentName);
    navigation.goBack();
  }

  return (
    <Container onPress={() => setIsDropdownOpen(false)} activeOpacity={1}>
      <GoBackButton />
      <HeaderText.Title message="Editar hábito" />
      <HeaderText.Subtitle message="Escolha qual opção você quer editar" />
      <FormWrapper>
        <Form.Label message="Qual hábito você quer enfrentar?" />
        <Form.DropdownWrapper>
          <Form.Dropdown
            title="Selecione um hábito"
            options={[{ img: "", title: "Title" }]}
            isDropdownOpen={isDropdownOpen}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            onSelectedOptionChange={(selectedOption) => setName(selectedOption)}
          />
        </Form.DropdownWrapper>

        <View style={{ height: 36 }} />

        <Form.Label message="Última vez que você se rendeu a este hábito" />
        <Form.DateInput />
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
