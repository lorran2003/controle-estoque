import { FilterProduct } from '../components/FilterProduct'
import { ButtonReturn } from '../components/ButtonReturn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faPlus,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faPencil,
  faRotate
} from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { Button } from '../components/Button'
import { ManageTable } from '../components/ManageTable'

export function ManageProductOutputs() {
  return (
    <section>
      <div className="px-10 py-10">
        <ButtonReturn route="/home" />

        <h1 className="text-3xl pt-2">Saída de produtos</h1>

        <FilterProduct />

        <div className="text-zinc-50 flex gap-4 justify-end">
          <Button
            route="/home/products/create-product"
            style="bg-yellow-500"
            text="Atualizar"
            icon={faRotate}
          />

          <Button
            route="/home/products/create-product"
            style="bg-blue-700"
            text="Criar produto"
            icon={faPlus}
          />
        </div>

        <ManageTable />

        <div className="flex gap-4 justify-end text-zinc-50">
          <Button
            route="/home/products/create-product"
            style="bg-yellow-500"
            text="Visualizar"
            icon={faEye}
          />

          <Button
            route="/home/products/create-product"
            style="bg-blue-700"
            text="Editar"
            icon={faPencil}
          />

          <Button
            route="/home/products/create-product"
            style="bg-red-600"
            text="Deletar"
            icon={faCircleXmark}
          />
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
