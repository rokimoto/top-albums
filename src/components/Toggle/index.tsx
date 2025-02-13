// Style
import './style.css'

interface ToggleProps {
  /**
   * The function that runs when the switch is toggled
   */
  handleToggle: () => void;
  /**
   * Whether the switch is toggled or not
   */
  selected: boolean;
  /**
   * An icon in text or unicode format
   */
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