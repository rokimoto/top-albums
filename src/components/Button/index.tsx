// Style
import './style.css'

interface ButtonProps {
  /**
   * The text inside the button
   */
  text: string;
}

const Button = ({text}: ButtonProps) => {
  return (
    <div className="button">{text}</div>
  )
}

export default Button;