import { createResource, createSignal } from "solid-js";
import { fetchSongs } from "./api/musicService";

import { Container, Center, Divider, Box } from "@hope-ui/solid";

import SongTable from "./components/SongTable";
import Header from "./components/Header";
import SongFilter from "./components/SongFilter";

function App() {
  const [search, setSearch] = createSignal("");
  const [songs] = createResource(search, fetchSongs);

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <Container mt="$2">
      <Center>
        <Header level="1" text="Music Library" />
      </Center>
      <Divider />
      <Container mt="$5" centerContent>
        <Box>
          <SongFilter value={search()} handleSearch={handleSearch} />
        </Box>
        <Box mt="$6">{songs() && <SongTable songs={songs()} />}</Box>
      </Container>
    </Container>
  );
}

export default App;
