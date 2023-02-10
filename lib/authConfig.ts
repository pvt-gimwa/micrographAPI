/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        // clientId: "d057403f-42d5-4b13-83f9-0f0fb680aade",
        // authority: "https://login.microsoftonline.com/75aea1b3-5ccf-4af6-948d-d9eb51f1c4f1",
        redirectUri: "/"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level:any, message:any, containsPii:any) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["User.Read Files.Read Files.ReadWrite Files.ReadWrite Files.ReadWrite.All"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = (month: string) => {
    const drive_id = "b!VMCHEw2j00S36IUERufRDt1vJOX9Y5ZLiYiY4brsaqmFEG7hAoQIS5a0WDh2DRY6"
    const item_id  = "01FZVVFE77EEYA2UNKMVD3HP2C3X4P2EBD"
    const area     = "$F$2:$CE$31"
    return  {
        // graphMeEndpoint: `https://graph.microsoft.com/v1.0/me/drive/items/01FZVVFE77EEYA2UNKMVD3HP2C3X4P2EBD/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')`
        // graphMeEndpoint: `https://graph.microsoft.com/v1.0/me/drive/items/01FZVVFE77EEYA2UNKMVD3HP2C3X4P2EBD/workbook/worksheets('${month}月予定表')/range(address='$F$2:$CE$31')`
        graphMeEndpoint: `https://graph.microsoft.com/v1.0/me/drives/${drive_id}/items/${item_id}/workbook/worksheets('${month}月予定表')/range(address='${area}')`
        // graphMeEndpoint: `https://graph.microsoft.com/v1.0/me/drives/b!VMCHEw2j00S36IUERufRDt1vJOX9Y5ZLiYiY4brsaqmFEG7hAoQIS5a0WDh2DRY6/items/01FZVVFE77EEYA2UNKMVD3HP2C3X4P2EBD/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')`
        // graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
    }    
}