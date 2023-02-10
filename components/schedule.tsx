import styles from '@/styles/Schedule.module.css'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { ProfileData } from '@/components/ProfileData';
import { useState } from 'react';
import { loginRequest } from '@/lib/authConfig';
import { callMsGraph } from '@/lib/graph';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
  
    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }
  
    return (
        <>
            <p className="card-title">Welcome {accounts[0].name ? accounts[0].name : null}</p>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <button onClick={RequestProfileData}>Request Profile Information</button>
            }
        </>
    );
  };
  
const Schedule = () => {
    const isAuthenticated = useIsAuthenticated();
    const session = {
        user:{
            email: null,
            name: null,
        },
        data:null
    }
    
    return(
        <span>
            <span
                className={styles.userSpan}
            >
                
                { isAuthenticated ? 
                <>
                    {/* <strong>{session.user.email ?? session.user.name}</strong> */}
                    {' | '}
                    <SignOutButton />
                </>
                :
                <>
                    {' | '}
                    <SignInButton />
                </>
                }
            </span>
            <div className={styles.dataSpan}>
                <span><b>- Session情報 -</b></span><br /><br />
                <AuthenticatedTemplate>
                    <ProfileContent />
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                    <h5 className="card-title">Please sign-in to see your profile information.</h5>
                </UnauthenticatedTemplate>
            </div>

            {/* {session?.user && (
                <span className={styles.dataSpan}>
                    <span><b>- Session情報 -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session, null, 2)}</code>
                </span>
            )}
            {session?.data && (
                <span className={styles.dataSpan}>
                    <span><b>- 取得したData -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session?.data, null, 2)}</code>
                </span> 
            )} */}
        </span>
    )
}
export default Schedule
