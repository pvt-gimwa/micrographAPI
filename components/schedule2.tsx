import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Client } from "@microsoft/microsoft-graph-client";
import { getToken } from 'next-auth/jwt';

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
  
interface Session {
    accessToken?: string;
}

const Schedule2:React.FC = () => {
    const [ session, loading ] = useSession<Session>() as const;
    const accessToken = session?.accessToken

    const [data, setData] = useState<string | null>(null);

    useEffect(() => {

        if (accessToken) {
            const client = Client.init({
                authProvider: (done) => done(null, accessToken),
            });      
            const fetchData = async () => {
                const data = await client.api("/me/drive/items/01GLA6DPN776CQXYQNGFCYR2UCHCLTSFVW/workbook/worksheets('2月予定表')/range(address='$F$2:$CE$31')").get();
                setData(data);
            };
        }else{
            const data = "Sign in plz"
            setData(data);
        }
    }, []);
    
    return(
        <span>
            {loading && (
                <span>Loading...</span>
            )}
        </span>
    )
}

export default Schedule2
