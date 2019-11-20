import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import Text from './text';

const ProfileTop = ({ name, photoComponent, descriptionComponent }) => (
  <Flex flexDirection="column" alignItems="center">
    <Text type="h2">{name}</Text>
    <Flex justifyContent="space-around" alignItems="center" ml={4} width={[0.8, 0.9, 1]}>
      {photoComponent}
      {descriptionComponent}
    </Flex>
  </Flex>
);

ProfileTop.propTypes = {
  name: PropTypes.string.isRequired,
  photoComponent: PropTypes.shape({
    type: PropTypes.func.isRequired,
  }).isRequired,
  descriptionComponent: PropTypes.shape({
    type: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileTop;
