import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Schedule.module.css'

const Schedule:React.FC= () => {

    const { data: session, status } = useSession();

    const isLoading = status === 'loading';

    if (session?.error === "RefreshAccessTokenError") {
        signIn(); // Force sign in to hopefully resolve error
    }

    if (isLoading) {
        return <span>Loading...</span>
    }
    
    return(
        <span>
            <span
                className={styles.userSpan}
            >
                {!session && (
                    <>
                        <a
                            href={`/api/auth/signin`}
                            onClick={(e) => {
                            e.preventDefault();
                            signIn();
                            }}
                        >
                            {' | '}Sign in
                        </a>
                    </>
                )}  
                {session?.user && (
                    <>
                        <small>| Signed in as </small>
                        <strong>{session.user.email ?? session.user.name}</strong>
                        <a
                            href={`/api/auth/signout`}
                            className={styles.userSpan}
                            onClick={(e) => {
                            e.preventDefault();
                            signOut();
                            }}
                        >
                            {' | '}<small>Sign Out</small>
                        </a>
                    </>
                )}
            </span>
            {session && (
                <span className={styles.dataSpan}>
                    <span><b>- Session情報 -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session, null, 2)}</code>
                </span>
            )}
            {session?.api_data && (
                <span className={styles.dataSpan}>
                    <span><b>- 取得したData -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session.api_data, null, 2)}</code>
                </span> 
            )}
        </span>
    )
}
export default Schedule
