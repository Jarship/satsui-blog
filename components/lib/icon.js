import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Flex } from "rebass";
import { variant } from "styled-system";
import Text from "./text";

const Outside = styled(Flex)(
  () => css`
    border-radius: 50%;
    color: white;
    justify-content: center;
    font-size: 20px;
    width: 100%;
    height: auto;
    align-items: center;
  `, 
  variant({ prop: "type", scale: "icons" })
);

const SYMBOLS = {
  check: "✓",
  plus : "+"
};

const Icon = ({ type, ...otherProps}) => (
  <Flex {...otherProps}>
    <Outside type={type}>
      {(type === "completed" || type === "inProgress") && SYMBOLS["check"]}
      {type === "planned" && SYMBOLS["plus"]}
    </Outside>
  </Flex>
);

export default Icon;

