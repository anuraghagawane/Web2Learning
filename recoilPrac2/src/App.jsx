import './App.css'
import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { TodoAtom, todoAtomFamily } from './store/atoms'

function App() {

  return (
    <>
      <RecoilRoot>
        <Todo id={1} />
        <Todo id={2} />
      </RecoilRoot>
    </>
  )
}

function Todo({ id }) {
  const todo = useRecoilValueLoadable(todoAtomFamily(id));
  if (todo.state === "loading") {
    return <div>Loading....</div>
  }
  return (
    <>
      <div>
        {todo.contents}
      </div>
    </>
  )
}

export default App
