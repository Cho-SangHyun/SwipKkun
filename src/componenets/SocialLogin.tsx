import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      {" "}
      <HStack my={8}>
        <Divider />
        <Text
          color={"gray.500"}
          textTransform={"uppercase"}
          fontSize={"xs"}
          as="b"
        >
          or
        </Text>
        <Divider />
      </HStack>{" "}
      <VStack>
        {" "}
        <Button leftIcon={<FaGoogle />} colorScheme="linkedin" w="100%">
          Continue with Google
        </Button>
      </VStack>
    </Box>
  );
}