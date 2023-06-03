import type { NextApiHandler } from "next";
import type { UsersResponse } from "server-lms";
import { initClasses } from "src/lib/initialization/initClasses";
import { getPBServer } from "src/lib/pb_server";

export interface PBClearResponse {
  requestBody: string;
  newlyAddedClasses?: string[];
}

const handler: NextApiHandler<PBClearResponse> = async (req, res) => {
  if (req.method === "POST") {
    const pbServer = await getPBServer(req, res);

    const user = pbServer.authStore.model as unknown as
      | UsersResponse
      | undefined;

    if (user == undefined) {
      res.status(400).json({ requestBody: "User is not authenticated" });
      return;
    }

    const newlyAddedClasses = await initClasses(pbServer, user);

    res.status(200).json({
      requestBody: "Classes added successfully",
      newlyAddedClasses,
    });
    return true;
  }

  res.status(400).json({ requestBody: "Not a POST request" });
  return false;
};

export default handler;
