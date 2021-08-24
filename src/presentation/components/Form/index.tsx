import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Modal,
  View,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
} from "react-native";

import {
  Container,
  ContainerWrapper,
  DropdownWrapper,
  TitleArea,
  TitleName,
  DropdownArea,
  LabelTitle,
  PersonalizedOptionArea,
  PersonalizedOptionInput,
  PersonalizedOptionCloseArea,
  PersonalizedOptionCloseImg,
  ModalPressable,
} from "./styles";

import OptionInDropdown from "../OptionInDropdown";

const OtherImg = require("../../assets/other.png");
const XCircle = require("../../assets/x-circle.png");

type FormWitDropdown = {
  options: [
    {
      img: any;
      title: string;
    }
  ];
  title: string;
  isDropdownOpen: boolean;
  onDropdownOpen: () => void;
  onDropdownClose: () => void;
  onSelectedOptionChange: (option: string) => void;
};

type FormLabel = {
  message: string;
};

type FormWrapper = {
  children: React.ReactElement;
};

type FormDate = {
  onPress: () => void;
  value: string;
};

const Form = {
  Dropdown({
    options,
    title,
    isDropdownOpen,
    onDropdownOpen,
    onDropdownClose,
    onSelectedOptionChange,
  }: FormWitDropdown) {
    const [selectedOption, setSelectedOption] = useState(title);
    const [personalizedOption, setPersonalizedOption] = useState(false);
    const [dropdownIsVisible, setDropdownIsVisible] = useState(isDropdownOpen);
    const dropdownAnimation = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
      if (isDropdownOpen) {
        openDropdown();
      } else {
        closeDropdown();
      }
    }, [isDropdownOpen]);

    useEffect(() => {
      if (selectedOption) {
        onSelectedOptionChange(selectedOption);
      }
    }, [selectedOption]);

    const openDropdown = () => {
      setDropdownIsVisible(true);
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    };

    const closeDropdown = () => {
      Animated.timing(dropdownAnimation, {
        toValue: -100,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setDropdownIsVisible(false);
        onDropdownClose();
      });
    };

    const setNewSelectedOption = (name: string) => {
      onDropdownClose();
      setSelectedOption(name);
    };

    const addedPersonalizedOption = () => {
      onDropdownClose();
      setPersonalizedOption(true);
    };

    const cancelPersonalizedOption = () => {
      setPersonalizedOption(false);
    };

    const dropdownOpenOrCloseProxy = () => {
      if (isDropdownOpen) return closeDropdown();
      onDropdownOpen();
    };

    return (
      <Container>
        <TitleArea onPress={dropdownOpenOrCloseProxy} activeOpacity={1}>
          {personalizedOption ? (
            <PersonalizedOptionArea>
              <PersonalizedOptionInput
                onChangeText={(text) => setSelectedOption(text)}
                autoFocus={true}
              />
              <PersonalizedOptionCloseArea onPress={cancelPersonalizedOption}>
                <PersonalizedOptionCloseImg source={XCircle} />
              </PersonalizedOptionCloseArea>
            </PersonalizedOptionArea>
          ) : (
            <TitleName>{selectedOption}</TitleName>
          )}
        </TitleArea>
        {dropdownIsVisible && (
          <DropdownArea
            style={{
              translateY: dropdownAnimation,
            }}
          >
            {options.map((element) => (
              <OptionInDropdown
                img={element.img}
                title={element.title}
                onPress={(name: string) => setNewSelectedOption(name)}
              />
            ))}
            <OptionInDropdown
              img={OtherImg}
              title="Outro"
              onPress={() => addedPersonalizedOption()}
            />
          </DropdownArea>
        )}
      </Container>
    );
  },
  Label({ message }: FormLabel) {
    return <LabelTitle>{message}</LabelTitle>;
  },
  DateInput({ onPress, value }: FormDate) {
    return (
      <TitleArea>
        <TitleName>{value || "Dia / Mês / Ano"} </TitleName>
      </TitleArea>
    );
  },

  Wrapper({ children }: FormWrapper) {
    return <ContainerWrapper>{children}</ContainerWrapper>;
  },

  DropdownWrapper({ children }: FormWrapper) {
    return <DropdownWrapper>{children}</DropdownWrapper>;
  },
};

export default Form;
