import React from "react";

import { Container, BtnTitle } from "./style";

type BtnGenericProps = {
  title: string;
  backgroundColor: string;
  onPress: () => void;
};

function BtnGeneric({ title, backgroundColor, onPress }: BtnGenericProps) {
  return (
    <Container backgroundColor={backgroundColor} onPress={() => onPress()}>
      <BtnTitle>{title}</BtnTitle>
    </Container>
  );
}

export default BtnGeneric;
