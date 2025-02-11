import { useState } from 'react'
// Components
import List from './components/List';
// Styles
import './App.css'
import './styles/reset.css'

function App() {
  const [theme, updateTheme] = useState<"light-theme" | "dark-theme">("light-theme");

  const toggleTheme = () => {
    if (theme === "light-theme") {
      updateTheme("dark-theme");
    } else {
      updateTheme("light-theme");
    }
  };

  return (
    <div  className={`app ${theme}`}>
      <div className='topContent'>
        <button className='button' onClick={() => toggleTheme()}>Change Theme</button>
        <div className='topContent-text'></div>
          <h1 className='topContent-header'>Top Albums</h1>
          <p className='topContent-text'>Nam accumsan, risus non lacinia mollis. Mi dolor dictum augue, quis venenatis odio nulla a.</p>
      </div>
      <List />
    </div>
  )
}

export default App
