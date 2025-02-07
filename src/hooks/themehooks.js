import { useColorMode } from "@chakra-ui/react";

const useThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return { colorMode, toggleColorMode };
};

export default useThemeToggle;
