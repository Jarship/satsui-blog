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

const UserMenu = ({ user: { photo, name, status }, logout, ...otherProps}) => {
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
        height="60px"
        alignItems="center"
      >
        <Image
          source={photo}
          altText="User Icon"
          width={1 / 4}
          pl={3}
        />
        <Text type="menuButton" pl={4}>{name} ▼</Text>
      </Flex>
      {open &&
        <Menu flexDirection="column" bg="darkKhaki" justifyContent="space-between" zIndex="3" borderRadius="0 0 15px 15px">
          {false && 
            <Link variant="menuLink" href="/[profile]">
              Profile
            </Link>
          }
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
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserMenu;
