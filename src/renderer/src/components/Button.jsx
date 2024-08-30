/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function Button(props) {
  return (
    <Link
      to={props.route}
      className={
        'flex items-center p-2 rounded-md text-xl gap-2 shadow-md font-semibold duration-300 hover:px-3 ' +
        props.style
      }
    >
      <FontAwesomeIcon icon={props.icon} />
      {props.text}
    </Link>
  )
}
