import { useEffect, useState } from 'react'
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Schedule.module.css'
import AzureADProvider from 'next-auth/providers/azure-ad';
import { getSchedule } from '@/lib/getSchedule';
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

// const getExcelData = async () => {
//     const data = await fetch('/api/getSchedule');
//     const presence = await data.json();
//     return presence
// }

// const excelData = getExcelData().then(res =>{
//     console.log(res.text)
    
//     return res.text
// })
// .catch(err =>{
//     return err
// })

// export async function getServerSideProps(NextApiRequest: NextApiRequest, NextApiResponse: NextApiResponse<any> ) {
//     const memberTable = await getSchedule( NextApiRequest, NextApiResponse )
//     return { props: { memberTable } }
//   }
  

const Schedule = ( { memberTable }: any ) => {

    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    // const aaa = await('/api/getSchedule')
    const [schedule, setSchedule] = useState("");

    useEffect(() => {
        fetch("/api/getSchedule")
        .then((res) => res.json())
        .then(
          (result) => {
            if(result.text){
                const data = result.text.toString()
                console.log(data)
                setSchedule(data)    
            }else{
                setSchedule("no data")    
            }
          },
          (error) => {
            setSchedule(error.toString())    
            }
        );
  
    }, []);

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
            {schedule && (
                <span className={styles.dataSpan}><code className={styles.codeBox}>{schedule}</code></span> 
            )}
        </span>
    )
}
export default Schedule
