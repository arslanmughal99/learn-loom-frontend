import React from "react";

import { withRef } from "@udecode/cn";
import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from "@udecode/plate-toggle";

import { ToolbarButton } from "./toolbar";
import { ChevronDown } from "lucide-react";

export const ToggleToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useToggleToolbarButtonState();
    const { props } = useToggleToolbarButton(state);

    return (
      <ToolbarButton ref={ref} tooltip="Toggle" {...props} {...rest}>
        <ChevronDown />
      </ToolbarButton>
    );
  }
);
