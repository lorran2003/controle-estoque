import { Link } from 'react-router-dom'
import plus from '../../assets/icons/plus.svg'

export function ButtonCreateProduct() {
  return (
    <Link
      to="/home/products/create-product"
      className="flex items-center bg-blue-700 p-2 rounded-md text-xl gap-2 shadow-md font-semibold duration-300 hover:px-3"
    >
      <i>
        <img src={plus} alt="icon atualizar" width={25} />
      </i>
      Criar produto
    </Link>
  )
}
