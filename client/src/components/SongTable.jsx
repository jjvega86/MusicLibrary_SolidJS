import { Table, Thead, Tbody, Tr, Td, Th } from "@hope-ui/solid";
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
          </Tr>
        </Thead>
        <Tbody>
          {props.songs.map((song) => {
            return (
              <Tr key={song.id}>
                <Td>{song.title}</Td>
                <Td>{song.album}</Td>
                <Td>{song.artist}</Td>
                <Td>{song.genre}</Td>
                <Td>{song.releaseDate}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
