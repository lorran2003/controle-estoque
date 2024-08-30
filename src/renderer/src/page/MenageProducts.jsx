import eye from '../assets/icons/eye.svg'
import { Table } from '../components/TableProduct'
import { ButtonCreateProduct } from '../components/product/ButtonInsertProduct'
import { ButtonUpdateProduct } from '../components/product/ButtonUpdateProduct'
import { ButtonUpdatePageProducts } from '../components/product/ButtonUpdatePageProducts'
import { ButtonDeleteProduct } from '../components/product/ButtonDeleteProduct'
import { FilterProduct } from '../components/product/FilterProduct'
import { ButtonReturn } from '../components/ButtonReturn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export function MenageProducts() {
  return (
    <section>
      <div className="px-10 py-10">
        <ButtonReturn route="/home" />

        <h1 className="text-3xl pt-2">Entradas</h1>

        <FilterProduct />

        <div className="text-zinc-50 flex gap-4 justify-end">
          <ButtonUpdatePageProducts />

          <ButtonCreateProduct />
        </div>

        <Table />

        <div className="flex gap-4 justify-end text-zinc-50">
          <button
            type="button"
            aria-label="Visualizare produto"
            className="bg-yellow-500 flex items-center text-xl font-semibold gap-2 p-2 rounded-md shadow-md duration-300 hover:px-4"
          >
            <i>
              <img src={eye} alt="icon olho" width={25} />
            </i>
            Visualizar
          </button>

          <ButtonUpdateProduct />

          <ButtonDeleteProduct />
        </div>
      </div>

      <h2 className="text-center text-xl">Mostrando 1 - 1 de resultados</h2>

      <div className="w-full flex justify-center items-center gap-2">
        <button
          type="button"
          aria-label="pagina anterior"
          className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <div className="text-xl bg-zinc-50 rounded-md shadow-md p-2">
          <span>00</span>
        </div>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </section>
  )
}
