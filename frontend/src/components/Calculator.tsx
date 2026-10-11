import { useState } from 'react';
import { calculate } from '../api/calculator';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNew, setWaitingForNew] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNum = (num: string) => {
    setError(null);
    if (waitingForNew) {
      setDisplay(num);
      setWaitingForNew(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    if (operation && !waitingForNew) {
      handleEqual();
    }
    setPrevious(display);
    setOperation(op);
    setWaitingForNew(true);
  };

  const handleEqual = async () => {
    if (!operation || !previous) return;
    

    if (operation === 'divide' && display === '0') {
      setError('Cannot divide by zero');
      setDisplay('Error');
      setWaitingForNew(true);
      return;
    }
    
    try {
      const res = await calculate({
        a: parseFloat(previous),
        b: parseFloat(display),
        operation
      });
      setDisplay(String(res.result));
      setPrevious(null);
      setOperation(null);
      setWaitingForNew(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Network error');
      setDisplay('Error');
      setWaitingForNew(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperation(null);
    setWaitingForNew(false);
    setError(null);
  };

  return (
    <div className="calculator">
      {error && <div className="error">{error}</div>}
      <div className="display">{display}</div>
      <div className="keypad">
        <button className="clear" onClick={clear}>C</button>
        <button className="clear" onClick={() => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)}>±</button>
        <button className="clear" onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
        <button className="operator" onClick={() => handleOp('divide')}>÷</button>
        
        <button onClick={() => handleNum('7')}>7</button>
        <button onClick={() => handleNum('8')}>8</button>
        <button onClick={() => handleNum('9')}>9</button>
        <button className="operator" onClick={() => handleOp('multiply')}>×</button>
        
        <button onClick={() => handleNum('4')}>4</button>
        <button onClick={() => handleNum('5')}>5</button>
        <button onClick={() => handleNum('6')}>6</button>
        <button className="operator" onClick={() => handleOp('subtract')}>−</button>
        
        <button onClick={() => handleNum('1')}>1</button>
        <button onClick={() => handleNum('2')}>2</button>
        <button onClick={() => handleNum('3')}>3</button>
        <button className="operator" onClick={() => handleOp('add')}>+</button>
        
        <button className="zero" onClick={() => handleNum('0')}>0</button>
        <button onClick={() => handleNum('.')}>.</button>
        <button className="operator" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}