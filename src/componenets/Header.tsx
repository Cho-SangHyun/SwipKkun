import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart, FaSyncAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { GoOctoface } from "react-icons/go";
import useUser from "../lib/useUser";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"space-between"}
      py={"5"}
      px={"40"}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={"green.800"}>
        <Link to="/">
          <FaSyncAlt size={"40"} />
        </Link>
      </Box>

      <HStack>
        <Link to="/chat" target="_blank" rel="noopener noreferrer">
          <IconButton
            color={"gray.700"}
            variant={"ghost"}
            aria-label="Ai chat"
            icon={<GoOctoface size="30px" />}
          ></IconButton>
        </Link>
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log In</Button>
              <Button onClick={onSignUpOpen} colorScheme="teal">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton
                  as={IconButton}
                  color={"gray.700"}
                  variant={"ghost"}
                  aria-label="myPage"
                  icon={<FaUser size="25px" />}
                />

                <MenuList>
                  <Link to="/articles/upload">
                    <MenuItem>마이페이지</MenuItem>
                  </Link>
                  <Link to="/articles/upload">
                    <MenuItem>대여글 올리기</MenuItem>
                  </Link>
                  <Link to="/articles/upload">
                    <MenuItem>로그아웃</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
              <IconButton
                color={"gray.700"}
                variant={"ghost"}
                aria-label="Cart"
                icon={<FaShoppingCart size="25px" />}
              ></IconButton>
            </>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}