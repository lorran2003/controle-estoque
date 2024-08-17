/* eslint-disable react/prop-types */
import search from '../assets/icons/search.svg'
import reload from '../assets/icons/reload.svg'
import plus from '../assets/icons/plus.svg'
import eye from '../assets/icons/eye.svg'
import xCircle from '../assets/icons/x-circle.svg'
import pencil from '../assets/icons/pencil.svg'
import chevronDoubleLeft from '../assets/icons/chevron-double-left.svg'
import chevronDoubleRight from '../assets/icons/chevron-double-right.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'
import { Table } from '../components/TableProduct'

export function ViewProduct({ createProduct }) {
  return (
    <>
      <div className="px-10 py-10">
        <h1 className="text-3xl">Produtos</h1>

        <div className="flex gap-4 py-4">
          <input
            type="text"
            placeholder="Filtrar por nome ou codigo"
            className="p-2 px-4 rounded-md shadow-md w-full"
          />
          <button
            type="submit"
            aria-label="filtrar"
            className="bg-green-400 p-3 rounded-md text-zinc-50 text-xl font-semibold flex items-center gap-2 shadow-md duration-300 hover:px-4"
          >
            <i>
              <img src={search} alt="icon procurar" width={30} />
            </i>
            Filtrar
          </button>
        </div>

        <div className="text-zinc-50 flex gap-4 justify-end">
          <button
            type="reset"
            aria-label="atualizar"
            className="flex items-center bg-yellow-500 p-2 rounded-md text-xl gap-2 shadow-md font-semibold duration-300 hover:px-3"
          >
            <i>
              <img src={reload} alt="icon atualizar" width={25} />
            </i>
            Atualizar
          </button>

          <button
            type="button"
            aria-label="criar produto"
            className="flex items-center bg-blue-700 p-2 rounded-md text-xl gap-2 shadow-md font-semibold duration-300 hover:px-3"
            onClick={() => createProduct('createProduct')}
          >
            <i>
              <img src={plus} alt="icon atualizar" width={25} />
            </i>
            Criar produto
          </button>
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

          <button
            type="submit"
            aria-label="Editar produto"
            className="bg-blue-700 flex items-center text-xl font-semibold gap-2 p-2 rounded-md shadow-md duration-300 hover:px-4"
          >
            <i>
              <img src={pencil} alt="icon olho" width={25} />
            </i>
            Editar
          </button>

          <button
            type="submit"
            aria-label="Deletar produto"
            className="bg-red-600 flex items-center text-xl font-semibold gap-2 p-2 rounded-md shadow-md duration-300 hover:px-4"
          >
            <i>
              <img src={xCircle} alt="icon olho" width={25} />
            </i>
            Deletar
          </button>
        </div>
      </div>

      <h2 className="text-center text-xl">Mostrando 1 - 1 de resultados</h2>

      <div className="w-full flex justify-center items-center gap-2">
        <button
          type="button"
          aria-label="pagina anterior"
          className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3"
        >
          <i>
            <img src={chevronDoubleLeft} alt="icon seta para esquerda" width={25} />
          </i>
        </button>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <i>
            <img src={chevronLeft} alt="icon seta para esquerda" width={25} />
          </i>
        </button>

        <div className="text-xl bg-zinc-50 rounded-md shadow-md p-2">
          <span>00</span>
        </div>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <i>
            <img src={chevronRight} alt="icon seta para esquerda" width={25} />
          </i>
        </button>

        <button className="bg-zinc-50 rounded-md shadow-md p-2 duration-300 hover:px-3">
          <i>
            <img src={chevronDoubleRight} alt="icon seta para esquerda" width={25} />
          </i>
        </button>
      </div>
    </>
  )
}
