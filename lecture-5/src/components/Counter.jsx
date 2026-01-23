import { useState } from 'react';

import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className='counter'>
      <h2 className='counter__title'>Counter: {count}</h2>
      <div className='counter__actions'>
        <button onClick={decrement} className='button'>
          Decrement
        </button>
        <button onClick={increment} className='button'>
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
