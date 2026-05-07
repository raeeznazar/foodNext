import styles from "./loading.module.css"

export default function LoadingPage() {
    return <p className={styles.loading} >Fetching meals , Please Wait ...</p>
}