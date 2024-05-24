import {
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
} from "@udecode/plate-indent-list";
import { withRef } from "@udecode/react-utils";

import { ToolbarButton } from "./toolbar";
import { SquareIcon } from "lucide-react";

export const IndentTodoToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useIndentTodoToolBarButtonState({ nodeType: "todo" });
    const { props } = useIndentTodoToolBarButton(state);

    return (
      <ToolbarButton ref={ref} tooltip="Todo" {...props} {...rest}>
        <SquareIcon />
      </ToolbarButton>
    );
  }
);
