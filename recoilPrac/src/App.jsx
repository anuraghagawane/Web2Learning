import { useContext } from 'react'
import './App.css'
import { countContext } from './context/countContext'
import { CountContextProvider } from './context/countContextProvider';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { counterAtom, isEvenSelector } from './store/atoms/counter';

function App() {
  return (
    <>
      {/* <CountContextProvider> */}
      <RecoilRoot>
        <Count />
        <IsEven />
        <Increase />
        <Decrease />
      </RecoilRoot>
      {/* </CountContextProvider> */}
    </>
  )
}

function Count() {
  // const { count } = useContext(countContext);
  const count = useRecoilValue(counterAtom);
  return <>
    <div>{count}</div>
  </>
}

function IsEven() {
  const iseven = useRecoilValue(isEvenSelector);

  return <>
    <div>{iseven ? "Even" : "Odd"}</div>
  </>
}

function Increase() {
  // const { setCount } = useContext(countContext);
  const setCount = useSetRecoilState(counterAtom);
  return <>
    <button onClick={() => setCount((prev) => prev + 2)}>Increase</button>
  </>
}

function Decrease() {
  // const { setCount } = useContext(countContext);
  const setCount = useSetRecoilState(counterAtom);
  return <>
    <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
  </>
}

export default App
