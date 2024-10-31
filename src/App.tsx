import styles from './App.module.css'
import Button from './components/button'

export default function App() {
  return (
    <div className={styles.AppContainer}>
      <h1>Hello CodeSandbox I can see you</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button>Button</Button>
    </div>
  )
}
