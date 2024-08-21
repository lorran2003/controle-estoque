/* eslint-disable react/prop-types */
import eye from '../assets/icons/eye.svg'
import chevronDoubleLeft from '../assets/icons/chevron-double-left.svg'
import chevronDoubleRight from '../assets/icons/chevron-double-right.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'
// import arrowLeft from '../assets/icons/arrow-left.svg'
import { Table } from '../components/TableProduct'
import { ButtonCreateProduct } from '../components/product/ButtonInsertProduct'
import { ButtonUpdateProduct } from '../components/product/ButtonUpdateProduct'
import { ButtonUpdatePageProducts } from '../components/product/ButtonUpdatePageProducts'
import { ButtonDeleteProduct } from '../components/product/ButtonDeleteProduct'
import { FilterProduct } from '../components/product/FilterProduct'
// import { Link } from 'react-router-dom'

export function Product() {
  return (
    <section>
      <div className="px-10 py-10">
        {/*
        CONSERTAR BUG
        <Link
          to="/home"
          className="flex w-28 items-center gap-2 bg-red-700 text-white shadow-md rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 duration-500 hover:bg-red-600 hover:shadow-inner hover:shadow-zinc-800 hover:-translate-y-1"
        >
          <i>
            <img src={arrowLeft} alt="voltar" width={20} />
          </i>
          Voltar
        </Link> */}

        <h1 className="text-3xl pt-2">Produtos</h1>

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
    </section>
  )
}
