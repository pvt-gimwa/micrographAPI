/**
 * file: pages/api/getPresence.ts
 * description: file responsible for the getPresence Microsoft Graph API
 * data: 11/03/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { getToken } from "next-auth/jwt";
import { Client } from "@microsoft/microsoft-graph-client";
import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.NEXTAUTH_SECRET

export const getSchedule = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token  = await getToken({
    req,
    secret
  });

  const accessToken = token?.accessToken;
  // const accessToken = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-KfLx1oAuAx8OOEB.QaBYS5_YvoNpxOVLGYZcHeysfFRo5e656Gq6gBKyDojVCPyVfFG_P2AKPR54IN1wGdXdLqRxi2TwrBfecoV1hb6yHkYbyVw227TZ05563Q04U-DIopWoNxAprUy8uynnZEie_rKIsmhGrnW67eywF64oI0A_fQWh6GbQ4OYeOTG-PyIMbAbGmfFqK0lO_6BJlukJAyuSQNV9kqi-O7iwDgOP5wOR8chGx1c4mfuAz2n3SyecIUSD8X2HP_Kfbbk6C3RBYbOtgEGLnGtAXzgaataSNmunnW-Xat3buqqWor4bdDwgEQSGy1VeVg9d-X7J1ZraEr0qnpztsPY_TwroTxTnX_w8ZBX-0QvOyyiPRCBgHHdN5jb4UYprcQZCOOkHpqdv5Vpd2m77bgSyHWivEmkRbD-_NN4B_bgdzVZ9FaEIVQ43Ix_Q-6k0yAsBZjsPIfIxGOU2sG6bezGsCMizZPsRgMuJep_QIRBFrxxUtZQwfwKyyD42qyrMDZHLxHvo4jNts5Lme8UxHEhUECT1NqZ64LW-NOa4RNnTE3TCgxVT_yHqv4MRuyFkI4Y9imVcK92SSznyLFu5elqJEBN5PXxMy2av_9XCHR5fm6_Ju94W4HIl6jiv_OFsZMuzHqdS4E384z3rL-RvLSY_GkIqDjIRcLgZivy_DY97aSatsveLmNFYm3CacNW_0-bqWXi8dp8ixGgkcwwylHs70XLRT9Yq7NDt8M4Vty4BjZgR_gZFrY635cerFDKgRIi_sOYbv8DbLTiVujolnYi4Kq8ReeJh5fcUZZ_lXvKSgDgjq-Y-wvsCDNQjHEWvFrol3_P2FatqqhZjkWusSB1xRABW0Mu1VzFQ2Fm4-kbVKM7XAX49_fx8O428sHgj9abhP6px761DVNNKzTSd_2CMkTBqt7C7uolqEGHK98I2I6pmFbeP99PbytDhPeDXy8-IU3EYCVcvUd1CqHcGyd1iF2rjPhwbn9YE6uFJmbyfigYfAzQH9jDap3K3D2By_VSoW2LVn-m1lCFqWjOeSIQwYbqUzVl2KzRhS_knLw9jEvDACjcx6647Ro1uA-b8IRB5RnmcsAiK7Jc_eL0NUbAJQkUBbcdcRork64lOkCxDrynsyzy0OlvFi0OklxKkdVwVXAbUGls2qHExgYhV_Ofjz-4Hz14aEiHf6Zcsdd0kRq1End4LlAENRtmXx-pr6Mj9Pxs_0jhxF8Ti1Qjtoa0J7hQ0xorKfDvGeAE0N1gG7bhjKN-veSMg5gjuOuj33YVpua_P82_CtjYgBifHDIAsKi6gXiLGanTjMfB7BNeOaGX8yD3sc9Y6X-EdrC-3sdCx-sQrD7c-4g3J-l1VvoXqhq4qcJUFdIRMX833-BYI8CMDit1tiSwy05B5WaL1UpQZz_vBGakFf26UYZzflmmqkd9o3HSl39bNF6iAc5cgeQBI9-Z0FEf3aPpHWuAxZfiYm1Cj7MuGLHj_G-kD3kJ4njY9_s02vv-jKu8166OFc7f1tbXpW23qnzMq9JbQEQc88D7WoSKjHr6pAHYjrzg6v5SyW2Xfn9ZsJ-ULsopeiNqR5_vZPP8FHe6vvPaxgLUo0NYXadNN2GqvBliv2uryrL6y6uCggxeBvPUvGOpitRphy9ukaalGkegSdHSqfXIeqnlYfBvMeZOxY8QT5qugM8KO8g12Mwx9e9yv1oNnb7mc0aP3lgMw0cKpu81zAXFZnvi6dYHdo6osBh9WA5Ijr3hAJS3s03IMLZh7n952g2h1YoYIzckKCCozVXkG0EZOvv0SpCSXFOz6GrxVuBOuZhO8l8Ydm4aXn_F3UluXz0EkgRgwIPViGWcYj_-2xGUa3comuRf_JoF0kAW4K6_RtyqQrsXpIXjtvi-_Q1sz0KN-ZZrEjOV23H-RVHXQSc4RUasXUweQgFulgojc9owW29XbeV44Kq0tM5KGhlpUmVy2XufI5HtkG-RnLr5pFSneRA2dARBPAvu47hy-k1oOOTeUE0liQUCXtQ1vFAklbqVvfGuG96rtLDHC4m3lmgfvDk8uQI2twcdlyHxNmQ9cKGKtToVT20gkff84CFgkEh8f7vF9PHw66XIsC5CfbraP0SYS1O4HO4apsnSHoY7bd8yjUZ3edu5fZ99ilF0zP98w0lDzweN8p16BK49kKxh8D4OhlQ6PHb54_4Zyi_uDaddlJ_A8pUCgN-QiAWa5dH6SjLfaUGHpt2UGuOL5nAo_5lrZ5H06CAMFPTdXLYi2O4yILD92qT_IPvl1S6oPiwqwIHMdKRYcr3O82KO75oWjs3kjwvVLhVkjobxA77qh-YrEed-1ST-tjEWZ4RELuVS5ECAcHuZJKfT6Y3rUpN3ppvMMfSzLZRIrSFOlBf5Pt0V3ELmyHNPupx8ciYaEtkov8w1ktz39254SnORt2Q9QFLj5UgUCtX41l38plOdu1LZtGSweQlUXoE6J8Aj9BuaSCCylej0J9rz5VtYE35UdE4Rnk0CH-afbaXCT16EpzuyB3RCLMtWfYqdqAAMAckzhXSq_QsPm1InDpOdJSLWot4I0-4N3Hezsil6ntj23kFWLUZCKzrxtz8qEciZ1hDtFCzYdy02mHcl6QY17_HIxml23hK8vrcppq4MW2NZ6BGOEAvFXFYVQ6y2MiMvAeHEUW0S1WQn14GUDpCIhNMwEoju9upvAu9I72DEOYD5hp0OIbMfX6FQtubLPOExHmZUXUgfpegBb4IH3Qg1EncTD9K4FHhd4k03VJCRhXKmAfFyRo6IodWB8kIkhbjb7BEPULN-E2_uvwIo3e5_Mn6wRZzTcZfzAmv4hMoA3JhA4bJLZ_uE5gR6iJaX39nKONGAbKxE2n8YA7LXnWZ2Lfy_rJzcgUbkVxsEMbVZzZjsvMpACPI3YWZglWTwuEJWSnbZ3eV1DPlXPvg6sLbTNL0Rj0fwvdxgaGpTCg4itJF5pK3IIKq1TBM2gM1SCZuRHR3HjaF5vaUeLfPTVlSLBtxu6YkzAeExoKgg9X0W3_4qthgLuIvWHXwdv8igqwC35qqD-pFThalea9c4BBmER5d1AGOf9nqdpUeWa9PDVtvWYwsktW7iFe4c2XevCNr_Nmu_6hOqpC4KSbbkBIKfyHTgagvyyxJ3Ba5AcCarZXQL0uMW-urnzrAPf5g5ZqzkedUd5q4ubNXiOOnxjP7gZW31ivuJKMnKO4IOnNkScRMlQ6rKfDuh2DuVKT-5LxstWlOY88KAWx8BIUNb7MgytZ6TdLVFXgOq1QoVDaOnGBJAyL5kCsn3Vsc_TdYsfhlVtQB33dRRsDbG4UK1LLGyX_ngKrGvrRVTdGQVycK0usgOTQKv6Wf-Boz7LeTdd2pFGzUg02MKx--_v-poKN6ZgyYXiqFS1-RVjU3DDdKcpwRJdj67IimbEDgyqXr8QfWnUzotZioWNz6fUeKwb1Y4w5-y3KgbqChGc5fx_42nhYtLyUXgOo6dDW6aqZ0BGcaVCZ2JjUjonmgS93sLhPO7MfyciCNuSBofNcq2Q1XlwI8wM9vcdzNtr2IGNACdCKKqEFKZn7-fC5h0wZ9h9aJ0SDAGnLFB0pbu-_0Y5s5-kjZEX9yw--VlK_GgEnhHYGhCmrdZRWRfUj6BKqNrCIXTFvpStuHAExZdleLpqP4FvuNjUvTAsS6oSzC1PmO0xWQp70rGSt1GFRrVc30lvS-AAc-qGiJEIi_o9wG2SeV8tzlx39D0eCeWS5uc3MEEl_leTfzsGzM_VQUAC28uP4VaZ1Q8lhRoFskZh3jDHQyNdziSgh-H8IQ7kjTrPIm8qXFV7CPc_Ux_-6V3Lq0gxpbT19t5ACf_WMC2SEdFOIoIFoThEzcz-LrxTog5ma4dQp2C';
  // console.log("token", token)
  // console.log("lib", req)
  // console.log("NextApiResponse", res)
  // console.log("JSON Web Token", accessToken)

  if (accessToken) {

    const client = Client.init({
      authProvider: (done) => done(null, accessToken),
    });

    const data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get();
    // return res.status(200).json(data);
    return data
  } else {
    // return res.status(401).json({ message: "Unauthorized" });
    return null
  }
}
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const token = await getToken({
//     req
//   });

//   const accessToken = token?.accessToken;

//   if (accessToken) {

//     const client = Client.init({
//       authProvider: (done) => done(null, accessToken),
//     });

//     const data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get();

//     res.status(200).json(data);

//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// }