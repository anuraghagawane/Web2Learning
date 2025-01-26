import "./App.css";
import useCounter from "./hooks/useCounter.js";
import useFetch from "./hooks/useFetch.js";

function App() {
 const { count, increment } = useCounter();
 const { data } = useFetch("https://jsonplaceholder.typicode.com/todos/1");

 return (
  <>
   <div>
    {data && <p>{data.title}</p>} {count}
   </div>
   <button onClick={() => increment()}>increment</button>
  </>
 );
}

export default App;
