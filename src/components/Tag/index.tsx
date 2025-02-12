// Style
import './style.css'

interface TagProps {
  text: string;
}

const Tag = ({text}: TagProps) => {
  return (
    <div className="tag">{text}</div>
  )
}

export default Tag;