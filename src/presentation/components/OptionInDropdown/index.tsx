import React from "react";
import { Container, ImageOption, TitleOption } from "./style";

type OptionInDropDownProps = {
  img: any;
  onPress: (name: string) => void;
  title: string;
};

function OptionInDropdown({ img, title, onPress }: OptionInDropDownProps) {
  return (
    <Container
      onLayout={(event) => event.stopPropagation()}
      onPress={() => onPress(title)}
    >
      <ImageOption source={img} />
      <TitleOption>{title}</TitleOption>
    </Container>
  );
}

export default OptionInDropdown;
