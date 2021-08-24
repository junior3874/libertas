import React from "react";

import { Title, Subtitle } from "./styles";

type PropsWithMessage = {
  message: string;
};

const HeaderText = {
  Title({ message }: PropsWithMessage) {
    return <Title>{message}</Title>;
  },
  Subtitle({ message }: PropsWithMessage) {
    return <Subtitle>{message}</Subtitle>;
  },
};

export default HeaderText;
