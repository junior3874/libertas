import React from "react";
import { useState } from "react";
import { View } from "react-native";
import BtnGeneric from "../../components/btnGeneric";
import Form from "../../components/Form";
import GoBackButton from "../../components/GoBackButton";
import HeaderText from "../../components/HeaderText";

import { Container, FormWrapper, EditButtonWrapper } from "./styles";

export default function UpdateHabit() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            onSelectedOptionChange={(event) => console.log(event)}
          />
        </Form.DropdownWrapper>

        <View style={{ height: 36 }} />

        <Form.Label message="Última vez que você se rendeu a este hábito" />
        <Form.DateInput />
      </FormWrapper>

      <EditButtonWrapper>
        <BtnGeneric
          backgroundColor="#6410E6"
          onPress={() => {}}
          title="Editar hábito"
        />
      </EditButtonWrapper>

      <BtnGeneric
        backgroundColor="#D62828"
        onPress={() => {}}
        title="Excluir hábito"
      />
    </Container>
  );
}
