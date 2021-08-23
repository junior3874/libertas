import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";

import { Container } from "./styles";

const ChevronLeftImg = require("../../assets/chevron-left.png");

export default function GoBackButton() {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.goBack()}>
      <Image source={ChevronLeftImg} />
    </Container>
  );
}
