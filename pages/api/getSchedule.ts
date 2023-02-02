/**
 * file: pages/api/getPresence.ts
 * description: file responsible for the getPresence Microsoft Graph API
 * data: 11/03/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { getToken, } from "next-auth/jwt";
import { Client } from "@microsoft/microsoft-graph-client";
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req
  });

  const accessToken = token?.accessToken;
  console.log("accessToken", accessToken)
  // console.log("api", req)

  if (accessToken) {

    const client = Client.init({
      authProvider: (done) => done(null, accessToken),
    });

    const data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get();

    res.status(200).json(data);

  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}