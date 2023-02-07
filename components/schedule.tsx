import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Schedule.module.css'
import { JWT } from "next-auth/jwt"
import { getMSgraphApi } from '@/lib/getSchedule';

interface Props {
    req: any;
}
const secret = process.env.NEXTAUTH_SECRET

const Schedule:React.FC<Props> = ({ req }) => {

    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const [data, setData] = useState(null);
    const accessToken = session?.token.accessToken
    
    useEffect(() => {        
        if (accessToken) {
            const fetchData = async () =>{
                try{
                    const api_data = await getMSgraphApi(accessToken)
                    setData(api_data.text)
                }catch(err){
                    console.log(err)
                }
            } 
            fetchData()
        } else {
            console.log("no accessToken")
        }
    
    }, []);

    // console.log(data)

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
            {session?.user && (
                <span className={styles.dataSpan}>
                    <span><b>- Session情報 -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session, null, 2)}</code>
                </span>
            )}
            {data && (
                <span className={styles.dataSpan}>
                    <span><b>- 取得したData -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(data, null, 2)}</code>
                </span> 
            )}
        </span>
    )
}
export default Schedule
