import { Input } from "@hope-ui/solid";

export default function SongFilter(props) {
  return (
    <>
      <Input
        placeholder="Enter search..."
        value={props.value}
        onInput={props.handleSearch}
      />
    </>
  );
}
