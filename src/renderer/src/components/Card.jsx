/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function Card(props) {
  return (
    <div className="bg-zinc-50 w-72 h-56 text-xl flex justify-between items-center p-1 font-medium duration-300 hover:duration-300 shadow-[0_0_4px] shadow-zinc-600 hover:shadow-md hover:shadow-zinc-800 rounded-lg before:block before:h-full before:w-1 before:bg-[#daa520] before:rounded-full after:block after:h-full after:w-1 after:bg-[#daa520] after:rounded-full gap-4 text-center">
      <div>
        <FontAwesomeIcon icon={props.icon} className="size-16 text-zinc-600" />
        <h2 className="py-4">{props.title}</h2>

        <Link
          to={props.route}
          className="bg-[#DAA520] rounded-md p-1 text-zinc-50 hover:shadow-inner hover:shadow-black duration-300"
        >
          {props.textButton}
        </Link>
      </div>
    </div>
  )
}
