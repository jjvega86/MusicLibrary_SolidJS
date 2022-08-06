import { createResource, createSignal } from "solid-js";
import { fetchSongs } from "./api/musicService";

import { Container, Center, Divider, Box, Flex, Spacer } from "@hope-ui/solid";
import { Motion } from "@motionone/solid";

import SongTable from "./components/SongTable";
import Header from "./components/Header";
import SongFilter from "./components/SongFilter";
import AddSong from "./components/AddSong";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {
  const [search, setSearch] = createSignal("");
  const [songs, { __, refetch }] = createResource(search, fetchSongs);

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <Container mt="$2">
      <Flex>
        <Box>
          <ColorModeSwitcher />
        </Box>
        <Spacer />
        <Box paddingRight="$15">
          <Motion.h1
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, easing: "ease-in-out" }}
          >
            <Header level="1" text="Music Library" />
          </Motion.h1>
        </Box>
        <Spacer />
      </Flex>
      <Divider />
      <Container mt="$5" centerContent>
        <Flex color="black">
          <Box p="$5">
            <SongFilter value={search()} handleSearch={handleSearch} />
          </Box>
          <Spacer />
          <Box p="$5">
            <AddSong refetch={refetch} />
          </Box>
        </Flex>
        <Box mt="$6">
          {songs() && <SongTable songs={songs()} refetch={refetch} />}
        </Box>
      </Container>
    </Container>
  );
}

export default App;
