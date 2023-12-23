import Test from "./Test"

import Hello from "./Hello";


// Component 1
const Component1 = () => {
    return <div>This is Component 1</div>;
  };
  
  // Component 2
  const Component2 = () => {
    return <div>This is Component 2</div>;
  };
  
  // Parent Component
  const App = () => {
    return (
      <div>
        <Component1 />
        <Component2 />
        <Test />
        <Hello />


      </div>
    );
  };
  

  export default App;