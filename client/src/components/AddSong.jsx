import {
  Button,
  createDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Input,
} from "@hope-ui/solid";

import { createStore } from "solid-js/store";
import { postSong } from "../api/musicService";

let initialValues = {
  title: "",
  album: "",
  artist: "",
  genre: "",
  releaseDate: "",
};

export default function AddSong(props) {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [fields, setFields] = createStore(initialValues);

  const handleSave = () => {
    postSong(fields, props.refetch);
    onClose();
    setFields({
      title: "",
      album: "",
      artist: "",
      genre: "",
      releaseDate: "",
    });
  };

  const updateFields = (event) => {
    setFields({ [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button onClick={onOpen}>Add Song</Button>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Add Song</ModalHeader>
          <ModalBody>
            <VStack spacing="$4">
              <Input
                placeholder="Title"
                variant="outline"
                name="title"
                value={fields.title}
                onInput={updateFields}
              />
              <Input
                placeholder="Album"
                variant="outline"
                name="album"
                value={fields.album}
                onInput={updateFields}
              />
              <Input
                placeholder="Artist"
                variant="outline"
                name="artist"
                value={fields.artist}
                onInput={updateFields}
              />
              <Input
                placeholder="Genre"
                variant="outline"
                name="genre"
                value={fields.genre}
                onInput={updateFields}
              />
              <Input
                variant="outline"
                name="releaseDate"
                type="date"
                value={fields.releaseDate}
                onInput={updateFields}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
