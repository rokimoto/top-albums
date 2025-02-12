// Style
import './style.css'

interface DarkModeToggleProps {
  handleToggle: () => void;
  theme: "light-theme" | "dark-theme";
}

const DarkModeToggle = ({handleToggle, theme}: DarkModeToggleProps) => {

  return (
    <div className="darkModeToggle" onClick={handleToggle}>
      <div className={`darkModeToggle-inner darkModeToggle-inner-${theme}`} onClick={handleToggle}>
        <div className="darkModeToggle-icon">{theme === 'light-theme' ? '\u263C' : '\u263e'}</div>
      </div>
    </div>
  )
}

export default DarkModeToggle;