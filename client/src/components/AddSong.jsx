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
} from "@hope-ui/solid";

export default function AddSong(props) {
  const { isOpen, onOpen, onClose } = createDisclosure();

  const handleSave = () => {
    console.log("Closed!");
    onClose();
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
            <p>TODO: Add form fields</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
