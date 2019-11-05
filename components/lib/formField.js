import { Flex } from 'rebass';
import styled from '@emotion/styled';
import { variant } from 'styled-system';
import PropTypes from 'prop-types';
import Text from './text';
import Field from './field';

const Wrapper = styled(Flex)(variant({ scale: "formFields"}));

const FormField = ({ value, onChange, placeholder, label, ...otherProps}) => (
  <Wrapper {...otherProps}>
    <Text type="label">{label}</Text>
    {label.includes('Password')
    ? <Field
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    type="password"
    />
    : <Field
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    />
    }
  </Wrapper>
);

FormField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormField;