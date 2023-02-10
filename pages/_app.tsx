import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
// import { loginRequest } from "authConfig";
// import { callMsGraph } from "graph";
// import { useState } from 'react';
// import { ProfileData } from '@/components/ProfileData';
// import Button from "react-bootstrap/Button";
import { PageLayout } from '@/components/PageLayout';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/authConfig";
// import ReactDOM from 'react-dom'
import React from 'react'
import { MsalProvider } from "@azure/msal-react";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
// const ProfileContent = () => {
//   const { instance, accounts } = useMsal();
//   const [graphData, setGraphData] = useState(null);

//   function RequestProfileData() {
//       // Silently acquires an access token which is then attached to a request for MS Graph data
//       instance.acquireTokenSilent({
//           ...loginRequest,
//           account: accounts[0]
//       }).then((response) => {
//           callMsGraph(response.accessToken).then(response => setGraphData(response));
//       });
//   }

//   return (
//       <>
//           <h5 className="card-title">Welcome {accounts[0].name}</h5>
//           {graphData ? 
//               <ProfileData graphData={graphData} />
//               :
//               <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
//           }
//       </>
//   );
// };

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
// const MainContent = () => {    
//   return (
//       <div className="App">
//           <AuthenticatedTemplate>
//               <ProfileContent />
//           </AuthenticatedTemplate>

//           <UnauthenticatedTemplate>
//               <h5 className="card-title">Please sign-in to see your profile information.</h5>
//           </UnauthenticatedTemplate>
//       </div>
//   );
// };

const msalInstance = new PublicClientApplication(msalConfig)

// const App = ({ Component, pageProps: {...pageProps }}: AppProps) => {
//   return (
//       <MsalProvider instance={msalInstance}>
//         <PageLayout>
//           {/* <MainContent /> */}
//           <Component {...pageProps}/>
//         </PageLayout>
//       </MsalProvider>
//   );
// }

const App = ({ Component, pageProps: {...pageProps }}: AppProps) => {
    return (
        <MsalProvider instance={msalInstance}>
            <Component {...pageProps}/>
        </MsalProvider>
    );
  }
  
export default App