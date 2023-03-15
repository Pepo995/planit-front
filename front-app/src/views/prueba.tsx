import TextInput from "../components/TextInput";
import { useState } from "react";

const Prueba = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <TextInput primary={true}></TextInput>
      <TextInput primary={false}></TextInput>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
};

export default Prueba;
