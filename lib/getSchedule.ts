import { Client } from '@microsoft/microsoft-graph-client';

export async function getMSgraphApi( accessToken:string ) {
  const client = Client.init({ authProvider: (done) => done(null, accessToken) });
  try{
    const api_data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get()
    return api_data
  }catch(err){
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}