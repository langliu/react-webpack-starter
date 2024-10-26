import styles from './App.module.css'

export default function App() {
  console.log('App is running!', styles.AppContainer)
  return (
    <div className={styles.AppContainer}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}
