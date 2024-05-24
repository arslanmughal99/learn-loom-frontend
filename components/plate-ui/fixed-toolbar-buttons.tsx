import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
// import { KEY_LIST_STYLE_TYPE, ListStyleType } from '@udecode/plate-indent-list';
import { ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { Icons, iconVariants } from "@/components/icons";
import { ToolbarGroup } from "./toolbar";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
// import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { ListToolbarButton } from "./list-toolbar-button";
import { IndentToolbarButton } from "./indent-toolbar-button";
// import { ListStyleType } from "@udecode/plate-indent-list";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { LinkToolbarButton } from "./link-toolbar-button";
import { ToggleToolbarButton } from "./toggle-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { TableDropdownMenu } from "./table-dropdown-menu";
// import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";

export default function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  // const indentList = settingsStore.use.checkedId(KEY_LIST_STYLE_TYPE);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          // Conceal the first separator on each line using overflow
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            {/* <ToolbarGroup noSeparator>
              <PlaygroundInsertDropdownMenu />
              {isEnabled('basicnodes', id) && (
                <PlaygroundTurnIntoDropdownMenu />
              )}
            </ToolbarGroup> */}

            <ToolbarGroup>
              <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={MARK_UNDERLINE}
                tooltip="Underline (⌘+U)"
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={MARK_STRIKETHROUGH}
                tooltip="Strikethrough (⌘+⇧+M)"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
                <Icons.code />
              </MarkToolbarButton>

              {/* {isEnabled("font", id) && (
                <>
                  <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                    <Icons.color
                      className={iconVariants({ variant: "toolbar" })}
                    />
                  </ColorDropdownMenu>
                  <ColorDropdownMenu
                    nodeType={MARK_BG_COLOR}
                    tooltip="Highlight Color"
                  >
                    <Icons.bg
                      className={iconVariants({ variant: "toolbar" })}
                    />
                  </ColorDropdownMenu>
                </>
              )} */}
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              {/* <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} /> */}

              <ListToolbarButton nodeType={ELEMENT_UL} />
              <ListToolbarButton nodeType={ELEMENT_OL} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              {/* <IndentTodoToolbarButton /> */}
              <LinkToolbarButton />

              <ToggleToolbarButton />

              {/* <MediaToolbarButton nodeType={ELEMENT_IMAGE} /> */}

              <TableDropdownMenu />
              {/* <EmojiDropdownMenu /> */}
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
