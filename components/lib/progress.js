import { Flex, Box } from 'rebass';
import styled from "@emotion/styled";
import PropTypes from 'prop-types';

const Wrapper = styled(Flex)(
  {
    height: "10px"
  },
  {
    label: "ui--progress-bar"
  }
);

const Bar = styled(Box)(
  ({
    theme: {
      colors: { smoke }
    }
  }) => ({
    height: "100%",
    marginRight: "auto",
    backgroundColor: smoke
  }),
  {
    label: "current--progress"
  }
);

const Progress = ({ amount, ...rest }) => (
  <Wrapper width={1} {...rest}>
    <Bar width={amount} />
  </Wrapper>
);

Progress.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Progress;
