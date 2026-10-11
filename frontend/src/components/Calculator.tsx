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

  const handleBackspace = () => {
    if (waitingForNew || display === 'Error') return;
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="calculator">
      {error && <div className="error">{error}</div>}

      <div className="display">{display}</div>
      
      <div className="keypad">
        <button className="top-action" onClick={clear}>AC</button>
        <button className="top-action" onClick={() => {}}>( )</button>
        <button className="top-action" onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
        <button className="operator" onClick={() => handleOp('divide')}>÷</button>
        
        <button className="number" onClick={() => handleNum('7')}>7</button>
        <button className="number" onClick={() => handleNum('8')}>8</button>
        <button className="number" onClick={() => handleNum('9')}>9</button>
        <button className="operator" onClick={() => handleOp('multiply')}>×</button>
        
        <button className="number" onClick={() => handleNum('4')}>4</button>
        <button className="number" onClick={() => handleNum('5')}>5</button>
        <button className="number" onClick={() => handleNum('6')}>6</button>
        <button className="operator" onClick={() => handleOp('subtract')}>−</button>
        
        <button className="number" onClick={() => handleNum('1')}>1</button>
        <button className="number" onClick={() => handleNum('2')}>2</button>
        <button className="number" onClick={() => handleNum('3')}>3</button>
        <button className="operator" onClick={() => handleOp('add')}>+</button>
        
        <button className="number" onClick={() => handleNum('0')}>0</button>
        <button className="number" onClick={() => handleNum('.')}>.</button>
        <button className="number" onClick={handleBackspace}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: '4px'}}>
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
            <line x1="18" y1="9" x2="12" y2="15"></line>
            <line x1="12" y1="9" x2="18" y2="15"></line>
          </svg>
        </button>
        <button className="equals" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}