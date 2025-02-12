// Style
import './style.css'

interface ButtonProps {
  text: string;
}

const Button = ({text}: ButtonProps) => {
  return (
    <div className="button">{text}</div>
  )
}

export default Button;