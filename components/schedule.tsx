import styles from '@/styles/Schedule.module.css'

const Schedule = () => {

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
                {!session && (
                    <>
                        <a
                            href=""
                            onClick={(e) => {
                            e.preventDefault();
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
                            href=""
                            className={styles.userSpan}
                            onClick={(e) => {
                            e.preventDefault();
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
            {session?.data && (
                <span className={styles.dataSpan}>
                    <span><b>- 取得したData -</b></span><br /><br />
                    <code className={styles.codeBox}>{JSON.stringify(session?.data, null, 2)}</code>
                </span> 
            )}
        </span>
    )
}
export default Schedule
