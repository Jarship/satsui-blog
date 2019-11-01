import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { variant } from "styled-system";
import { Box } from "rebass";

const Text = styled(Box)(
  () => css`
    margin: 0;
  `,
  variant({ prop: "type", scale: "texts" }),
  {
    label: "common--text"
  }
);

Text.defaultProps = {
  texts: "common"
};

export default Text;