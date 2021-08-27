import React, { useState, useRef, useEffect } from "react";
import { Animated, Keyboard } from "react-native";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

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
} from "./styles";

import OptionInDropdown from "../OptionInDropdown";

const OtherImg = require("../../assets/other.png");
const XCircle = require("../../assets/x-circle.png");

type FormWitDropdown = {
  options: {
    img: any;
    title: string;
  }[];
  title: string;
  isDropdownOpen: boolean;
  onDropdownOpen: () => void;
  onDropdownClose: () => void;
  onSelectedOptionChange: (option: string) => void;
  option: string;
};

type FormLabel = {
  message: string;
};

type FormWrapper = {
  children: React.ReactElement;
};

type FormDate = {
  value: Date;
  setLastDate: (date: Date) => void;
  visible: boolean;
  setIsVisible: () => void;
  onPress: () => void;
};

const Form = {
  Dropdown({
    options,
    title,
    isDropdownOpen,
    onDropdownOpen,
    onDropdownClose,
    onSelectedOptionChange,
    option,
  }: FormWitDropdown) {
    //==================================================================
    // States
    //==================================================================

    const [personalizedOption, setPersonalizedOption] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //==================================================================
    // Refs
    //==================================================================

    const dropdownAnimation = useRef(new Animated.Value(-100)).current;

    //==================================================================
    // Handlers
    //==================================================================

    const setNewSelectedOption = (name: string) => {
      onDropdownClose();
      onSelectedOptionChange(name);
    };

    const addedPersonalizedOption = () => {
      onDropdownClose();
      setPersonalizedOption(true);
      onSelectedOptionChange("");
    };

    const cancelPersonalizedOption = () => {
      setPersonalizedOption(false);
      onSelectedOptionChange("");
    };

    const dropdownOpenOrCloseProxy = () => {
      if (isDropdownOpen) return closeDropdown();
      onDropdownOpen();
    };

    //==================================================================
    // Animations
    //==================================================================

    const openDropdown = () => {
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
        setDropdownVisible(false);
        onDropdownClose();
      });
    };

    //==================================================================
    // Hooks
    //==================================================================

    useEffect(() => {
      if (isDropdownOpen) {
        setDropdownVisible(true);
        openDropdown();
      } else {
        closeDropdown();
      }
    }, [isDropdownOpen]);
    return (
      <Container>
        <TitleArea onPress={dropdownOpenOrCloseProxy} activeOpacity={1}>
          {!personalizedOption ? (
            <TitleName>{option || "Selecione um hábito"}</TitleName>
          ) : (
            <PersonalizedOptionArea>
              <PersonalizedOptionInput
                onChangeText={(text) => onSelectedOptionChange(text)}
                autoFocus={true}
              />

              <PersonalizedOptionCloseArea onPress={cancelPersonalizedOption}>
                <PersonalizedOptionCloseImg source={XCircle} />
              </PersonalizedOptionCloseArea>
            </PersonalizedOptionArea>
          )}
        </TitleArea>
        {dropdownVisible && (
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
  DateInput({ value, setLastDate, visible, setIsVisible, onPress }: FormDate) {
    const [selectedValue, setSelectedValue] = useState(false);

    const onChange = (_: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || value;
      setLastDate(currentDate);
      setIsVisible();
      setSelectedValue(true);
    };

    const formatedValue = format(value, "dd/MM/yyyy");

    return (
      <TitleArea onPress={onPress}>
        <TitleName>
          {selectedValue ? formatedValue : "Dia / Mês / Ano"}{" "}
        </TitleName>
        {visible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
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
