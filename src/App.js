import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function Greeting(props) {
  const handleChange = (event) => {
    props.onGreetingChange(props.name, event.target.value); // Immediate update
  };

  const displayGreeting = props.admin
    ? props.sharedGreeting
    : props.localGreetings[props.name] !== null
    ? props.localGreetings[props.name]
    : props.sharedGreeting;

  return (
    <div>
      <h1>{props.greeting}, {props.name}!</h1>
      <p>Custom Greeting: {displayGreeting || 'None yet'}</p>
      <input
        value={displayGreeting || ''} // Use display value directly
        onChange={handleChange}
        placeholder="Type a new greeting"
      />
      <p>Welcome to React.</p>
    </div>
  );
}

function App() {
  const people = [
    { id: 1, name: 'Alex', greeting: 'Hi', admin: true },
    { id: 2, name: 'Sam', greeting: 'Hola' },
    { id: 3, name: 'Taylor', greeting: 'Hey', admin: false },
    { id: 4, name: 'Emil', greeting: 'Ahoy', admin: false },
  ];

  const initialLocalGreetings = people.reduce((acc, person) => {
    if (!person.admin) acc[person.name] = null;
    return acc;
  }, {});

  const [sharedGreeting, setSharedGreeting] = useState('');
  const [localGreetings, setLocalGreetings] = useState(initialLocalGreetings);
  const [log, setLog] = useState([]);
  const lastLogTimer = useRef(null); // For debouncing log

  const handleGreetingChange = (name, value) => {
    const isAdmin = people.find(p => p.name === name).admin;
    if (isAdmin) {
      setSharedGreeting(value);
      setLocalGreetings(initialLocalGreetings); // Reset non-admins
    } else {
      setLocalGreetings((prev) => ({ ...prev, [name]: value }));
    }

    // Debounced logging
    if (lastLogTimer.current) clearTimeout(lastLogTimer.current);
    lastLogTimer.current = setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const logEntry = `[${timestamp}] User ${name} changed greeting as follows: ${people.map(p => `${p.name}="${p.admin ? sharedGreeting : localGreetings[p.name] || sharedGreeting || 'None'}"`).join(', ')}`;
      setLog((prevLog) => [...prevLog, logEntry]);
    }, 2000);
  };

  // Initial render skip (optional, if still needed)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  return (
    <div className="App">
      {people.map((person) => (
        <Greeting
          key={person.id}
          name={person.name}
          greeting={person.greeting}
          admin={person.admin}
          sharedGreeting={sharedGreeting}
          localGreetings={localGreetings}
          onGreetingChange={handleGreetingChange}
        />
      ))}
      <div className="log-area">
        <h2>Change Log</h2>
        <pre>{log.join('\n')}</pre>
      </div>
    </div>
  );
}

export default App;