import styled from "@emotion/styled";
import { variant } from "styled-system";
import { Box } from "rebass";

const Field = styled(Box)(
  {
    width: "100%",
    "::placeholder": {
      textTransform: "capitalize"
    }
  },
  variant({
    scale: "fields"
  })
);

Field.defaultProps = {
  variant: "primary"
};

export default props => <Field as="input" {...props} />;
