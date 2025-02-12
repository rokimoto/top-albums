import { useState } from 'react'
// Components
import List from './components/List';
import Toggle from './components/Toggle';
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
        <div className='darkModeToggle'>
          <Toggle handleToggle={toggleTheme} selected={theme === 'light-theme'} icon={theme === 'light-theme' ? '\u263C' : '\u263e'} />
        </div>
        <div className='topContent-text'></div>
          <h1 className='topContent-header'>Top Albums</h1>
          <p className='topContent-text'>Browse genres. Or years. Discover your new favorite trending album.</p>
      </div>
      <List />
    </div>
  )
}

export default App
