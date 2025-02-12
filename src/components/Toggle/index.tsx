// Style
import './style.css'

interface ToggleProps {
  handleToggle: () => void;
  selected: boolean;
  icon?: string;
}

const Toggle = ({handleToggle, selected, icon}: ToggleProps) => {

  return (
    <div className="toggle" onClick={handleToggle}>
      <div className={`toggle-inner toggle-inner-${selected ? 'selected' : ''}`} onClick={handleToggle}>
        {icon && <div className="toggle-icon">{icon}</div>}
      </div>
    </div>
  )
}

export default Toggle;