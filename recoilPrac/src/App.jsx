import { useContext } from 'react'
import './App.css'
import { countContext } from './context/countContext'
import { CountContextProvider } from './context/countContextProvider';

function App() {
  return (
    <>
      <CountContextProvider>
        <Count />
        <Increase />
        <Decrease />
      </CountContextProvider>
    </>
  )
}

function Count() {
  const { count } = useContext(countContext);
  return <>
    <div>{count}</div>
  </>
}

function Increase() {
  const { setCount } = useContext(countContext);
  return <>
    <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
  </>
}

function Decrease() {
  const { setCount } = useContext(countContext);
  return <>
    <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
  </>
}

export default App
