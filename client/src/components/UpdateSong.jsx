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
  notificationService,
} from "@hope-ui/solid";

import { createStore } from "solid-js/store";
import { updateSong } from "../api/musicService";

export default function UpdateSong(props) {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [fields, setFields] = createStore({
    title: props.song.title,
    album: props.song.album,
    artist: props.song.artist,
    genre: props.song.genre,
    releaseDate: props.song.releaseDate,
  });

  const handleSave = () => {
    updateSong(props.song._id, props.refetch, fields);
    onClose();
    notificationService.show({
      title: "Success!",
      description: "Song updated!! 🎶",
    });
  };

  const updateFields = (event) => {
    setFields({ [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button onClick={onOpen}>Update Song</Button>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Update Song</ModalHeader>
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
