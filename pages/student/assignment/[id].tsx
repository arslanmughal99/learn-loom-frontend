import { getCookie } from "cookies-next";
import { Value } from "@udecode/plate-common";
import { GetServerSidePropsContext } from "next";
import { FunctionComponent, useState } from "react";
import { serializeMdNodes } from "@udecode/plate-serializer-md";

import { PlateEditor } from "./ChatEditor";
import { Button } from "@/components/ui/button";
import { CircleAlertIcon } from "lucide-react";
import { ActiveAssignment } from "@/typings/assignment";

interface AssignmentChatProps {
  assignment: ActiveAssignment;
}

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

const AssignmentChat: FunctionComponent<AssignmentChatProps> = ({
  assignment,
}) => {
  const [nodes, setNodes] = useState<Value>([]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="h-[80vh] border rounded-md flex flex-col bg-secondary/50">
        <div className="flex items-center justify-between">
          <div>
            {}
            {assignment.status}
          </div>
          <div></div>
        </div>

        <div className="flex-1">Messages</div>

        <div className="mx">
          <PlateEditor changes={setNodes} />
        </div>

        <div className="flex px-2 items-center">
          <div className="flex-1 flex items-center gap-x-1">
            <CircleAlertIcon className="inline h-3 w-3" />
            <p className="text-xs">
              To submit files you can attach google drive links
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => console.log(serializeMdNodes(nodes!))}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(cx: GetServerSidePropsContext) {
  const session = getCookie(process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!, {
    req: cx.req,
  });

  if (!session) {
    return {
      redirect: "/login?error=Session expired.",
    };
  }

  if (!cx.params || !cx.params.id) {
    return {
      redirect: "/student/assignment",
    };
  }

  const activeAssignmentId = cx.params.id! as string;
  const url = endpoint + "/assignment/" + activeAssignmentId;
  const resRaw = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
  const res = await resRaw.json();

  return {
    props: { assignment: res },
  };
}
export default AssignmentChat;
