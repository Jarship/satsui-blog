import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { Flex } from "rebass";
import { position, border } from 'styled-system';
import { useState } from 'react';
import Link from './link';
import Text from "./text";
import Image from "./image";

const hover = {
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    borderRadius: "0 0 15px 15px"
  }
};

const Menu = styled(Flex)(position, border);

const UserMenu = ({ user: { photo, name, status, url }, logout, ...otherProps}) => {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState();

  const handleDisplay = seconds => {
    setTimer(setTimeout(() => setOpen(true), 60 * seconds));
  };

  const toggleMenu = () => setOpen(!open);

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setTimer(null);
    setOpen(false);
  };

  return (
    <Menu
      zIndex="3"
      flexDirection="column"
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => toggleMenu()}
      onMouseEnter={() => handleDisplay(3)}
      bg={open ? "darkKhaki" : "khaki"}
      {...otherProps}
    >
      <Flex
        alignSelf="flex-end"
        alignItems="center"
      >
        <Image
          variant="thumbnail"
          source={photo}
          altText="User Icon"
        />
        <Text type="menuButton" pl={4}>{name} ▼</Text>
      </Flex>
      {open &&
        <Menu flexDirection="column" bg="darkKhaki" justifyContent="space-between" zIndex="3" borderRadius="0 0 15px 15px">
          <Link variant="menuLink" href="/p/[profile]" as={`/p/${url}`} >
            Profile
          </Link>
          {status === "ADMINISTRATOR" &&
            <Link variant="menuLink" href="/admin">
              Admin Page
            </Link>
          }
          <Text
            sx={hover}
            type="menuButton"
            onClick={logout}
          >
            Log out
          </Text>
        </Menu>
      }
    </Menu>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

export default UserMenu;
