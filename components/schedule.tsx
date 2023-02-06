import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Schedule.module.css'
import { JWT } from "next-auth/jwt"
import { Client } from '@microsoft/microsoft-graph-client';

interface Props {
    req: any;
}
const secret = process.env.NEXTAUTH_SECRET

const Schedule:React.FC<Props> = ({ req }) => {

    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const [schedule, setSchedule] = useState("");
    const [data, setData] = useState(null);
    const accessToken = session?.token.accessToken
    let schedule_data = null
    
    useEffect(() => {
        fetch("/api/getSchedule")
        .then((res) => res.json())
        .then(
          (result) => {
            if(result.text){
                const data = result.text
                setSchedule(data)    
            }else{
                setSchedule("no data")    
            }
          },
          (error) => {
            setSchedule(error.toString())    
            }
        );

        
        if (accessToken) {

            console.log("has accessToken")
            // console.log(accessToken)

            const fetchData = async () =>{
                const client = Client.init({ authProvider: (done) => done(null, accessToken) });
                try{
                    const api_data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get();
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

    console.log(data)

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
                <span
                    className={styles.dataSpan}
                >
                    <code>{JSON.stringify(session, null, 2)}</code>
                </span>
            )}
            {/* {schedule && (
                <span className={styles.dataSpan}><code className={styles.codeBox}>{JSON.stringify(schedule, null, 2)}</code></span> 
            )} */}
            {data && (
                <span className={styles.dataSpan}><code className={styles.codeBox}>{JSON.stringify(data, null, 2)}</code></span> 
            )}
        </span>
    )
}
export default Schedule
