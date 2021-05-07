import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";

const Search = () => {
  return (
    <>
      <InputGroup size="lg" p="2" mt="8" w="35%">
        <InputLeftElement width="4.5rem">
          <SearchIcon mt="5" color="gray.400" />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          placeholder="Search"
          borderRadius="full"
          borderColor="gray.100"
          bg="gray.100"
        />
      </InputGroup>
    </>
  );
};

export default Search;
