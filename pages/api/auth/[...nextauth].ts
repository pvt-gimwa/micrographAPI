/**
 * file: pages/api/auth/[...nextauth].ts
 * description: file responsible for the authenticate an user using AAD Provider
 * data: 10/28/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from 'next-auth/providers/azure-ad'
import axios from "axios"
import { getMSgraphApi } from "@/lib/getSchedule";

const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
      {
        client_id: process.env.AZURE_AD_CLIENT_ID!,
        scope: 'Files.Read Files.ReadWrite Files.ReadWrite Files.ReadWrite.All',
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        client_secret: process.env.AZURE_AD_CLIENT_SECRET!
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const authOptions: NextAuthOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID,
//       authorization: {
//         params: {
//           scope: 'openid profile email offline_access Files.Read Files.ReadWrite Files.ReadWrite Files.ReadWrite.All'
//         }
//       }
//     }),
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token and user id from a provider.
//       session.token = token.accessToken
//       // const api_data = await getMSgraphApi(token.accessToken!)
//       // console.log(api_data)
//       // console.log("session",session)
//       // console.log("token",token)
//       return session
//     },
//     async jwt({ token, account, user }) {
//       // console.log("token",token)
//       // console.log("account",account)
//       // console.log("user",user)
//       // Persist the OAuth access_token to the right token after signin
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//         // console.log(token)
//       }
//       return token;
//     }
//   }
// }



export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: 'openid profile email offline_access Files.Read Files.ReadWrite Files.ReadWrite Files.ReadWrite.All'
        }
      }  
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log("session",session)
      // console.log("token",token)
      // console.log("user",user)
      // console.log("token",token)
      // const test = await refreshToken(token.refreshToken!)
      // console.log(" ")
      // console.log("----------------------------------------------")
      // console.log("test",token.refreshToken!)
      // console.log("----------------------------------------------")
      // console.log(" ")
      session.api_data = token.data
      session.token = token
      return session
    },
    async jwt({ token, user, account, profile, isNewUser  }) {
      // console.log("token",token)
      // console.log("account",account)
      // console.log("user",user)
      // console.log("profile",profile)
      // console.log("isNewUser",isNewUser)
      // Persist the OAuth access_token to the right token after signin
      // console.log("test",test)
      let api_data = null
      try{
        api_data = await getMSgraphApi(token.accessToken!)
      }catch(err){
        api_data = null
        console.log(err)
      } 

      // const test            = await refreshToken(token.refreshToken!)

      // console.log(" ")
      // console.log("----------------------------------------------")
      // console.log("test",test)
      // console.log("token",token)
      // console.log("----------------------------------------------")
      // console.log(" ")

      token.data = api_data?.text || null

      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("user",user)
      // console.log("account",account)
      // console.log("profile",profile)
      // console.log("email",email)
      // console.log("credentials",credentials)
      return true
    },
    async redirect({ url, baseUrl }) {
      // console.log("url",url)
      // console.log("baseUrl",baseUrl)
      return baseUrl
    },
  }
});