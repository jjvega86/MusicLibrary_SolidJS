import { Table, Thead, Tbody, Tr, Td, Th, Button } from "@hope-ui/solid";
import { deleteSong } from "../api/musicService";
import UpdateSong from "../components/UpdateSong";
export default function SongTable(props) {
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th scope="col">Title</Th>
            <Th scope="col">Album</Th>
            <Th scope="col">Artist</Th>
            <Th scope="col">Genre</Th>
            <Th scope="col">Release Date</Th>
            <Th scope="col">Delete Song</Th>
            <Th scope="col">Update Song</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.songs.map((song) => {
            return (
              <Tr key={song._id}>
                <Td>{song.title}</Td>
                <Td>{song.album}</Td>
                <Td>{song.artist}</Td>
                <Td>{song.genre}</Td>
                <Td>{new Date(song.releaseDate).toLocaleDateString()}</Td>
                <Td>
                  <Button onClick={() => deleteSong(song._id, props.refetch)}>
                    DELETE
                  </Button>
                </Td>
                <Td>
                  <UpdateSong song={song} refetch={props.refetch} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
