/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import arrowLeft from '../assets/icons/arrow-left.svg'

export function ButtonReturn(props) {
  return (
    <Link
      to={props.route}
      className="flex w-28 items-center gap-2 bg-red-700 text-white shadow-md rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 duration-500 hover:bg-red-600 hover:shadow-inner hover:shadow-zinc-800 hover:-translate-y-1"
    >
      <i>
        <img src={arrowLeft} alt="voltar" width={20} />
      </i>
      Voltar
    </Link>
  )
}
