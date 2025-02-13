import { ReactNode } from 'react';
// Style
import './style.css'

interface ButtonProps {
  /**
   * The content/text inside the button
   */
  text: string | ReactNode;
}

const Button = ({text}: ButtonProps) => {
  return (
    <div className="button">{text}</div>
  )
}

export default Button;