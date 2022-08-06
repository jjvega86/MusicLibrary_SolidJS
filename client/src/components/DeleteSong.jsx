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
  notificationService,
  HStack,
  Spacer,
  Box,
} from "@hope-ui/solid";

import { deleteSong } from "../api/musicService";

export default function DeleteSong(props) {
  const { isOpen, onOpen, onClose } = createDisclosure();

  const handleDelete = () => {
    deleteSong(props.id, props.refetch);
    onClose();
    notificationService.show({
      title: "Success!",
      description: "Song deleted!! 🎶",
    });
  };

  return (
    <>
      <Button onClick={onOpen}>DELETE</Button>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Delete Song?</ModalHeader>
          <ModalBody>
            <HStack spacing="24px">
              <Box>
                <Button onClick={handleDelete} colorScheme="danger">
                  YES
                </Button>
              </Box>
              <Box>
                <Button onClick={onClose} colorScheme="warning">
                  NO
                </Button>
              </Box>
            </HStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
