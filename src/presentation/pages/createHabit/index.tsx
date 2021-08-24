import React, { useState } from "react";

import { Container, FormWrapper } from "./styles";

import Form from "../../components/Form";
import HeaderText from "../../components/HeaderText";
import GoBackButton from "../../components/GoBackButton";
import BtnGeneric from "../../components/btnGeneric";
import { View } from "react-native";

const MoreImg = require("../../assets/more.png");

export default function CreateHabit({}) {
  const optionsTesting = [
    {
      img: MoreImg,
      title: "Pare de fumar",
    },
    {
      img: MoreImg,
      title: "Pare de tomar guaravita",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Container onPress={() => setIsDropdownOpen(false)}>
      <GoBackButton />

      <HeaderText.Title message="Criar novo hábito" />
      <HeaderText.Subtitle message="Escolha uma das opções de hábitos" />

      <FormWrapper>
        <Form.Label message="Qual hábito você quer enfrentar" />
        <Form.DropdownWrapper>
          <Form.Dropdown
            title="Selecione um hábito"
            options={optionsTesting}
            isDropdownOpen={isDropdownOpen}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            onSelectedOptionChange={(event) => console.log(event)}
          />
        </Form.DropdownWrapper>

        <View style={{ height: 36 }} />

        <Form.Label message="Última vez que você se rendeu a este hábito" />
        <Form.DateInput onPress={() => {}} value="" />
      </FormWrapper>

      <View style={{ height: 60 }} />
      <BtnGeneric
        title="Criar novo hábito"
        backgroundColor="#6410E6"
        onPress={() => {}}
      />
    </Container>
  );
}
