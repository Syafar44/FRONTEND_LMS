import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonUpdate?: () => void;
  onPressButtonDelete?: () => void;
  hideButtonDelete?: boolean;
  hideButtonUpdate?: boolean;
  textButton?: string;
}

const DropdownAction = (props: PropTypes) => {
  const {
    onPressButtonDetail,
    onPressButtonUpdate,
    onPressButtonDelete,
    hideButtonUpdate = false,
    hideButtonDelete = false,
    textButton = "Detail"
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          {textButton}
        </DropdownItem>
        {!hideButtonUpdate ? (
          <DropdownItem key="detail-event-button" onPress={onPressButtonUpdate}>
            Perbarui
          </DropdownItem>
        ) : null}
        {!hideButtonDelete ? (
          <DropdownItem
            key="delete-event"
            className="text-primary "
            onPress={onPressButtonDelete}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
