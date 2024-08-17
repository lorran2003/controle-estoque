import arrowLeft from '../assets/icons/arrow-left.svg'
import search from '../assets/icons/search.svg'
import reload from '../assets/icons/reload.svg'
import plus from '../assets/icons/plus.svg'
import eye from '../assets/icons/eye.svg'
import xCircle from '../assets/icons/x-circle.svg'
import pencil from '../assets/icons/pencil.svg'
/* eslint-disable react/prop-types */
export function Product({ setRenderPage }) {
  return (
    <section className="p-10">
      <button
        aria-label="voltar para pagina inicial"
        type="button"
        className="bg-red-600 text-zinc-50 rounded-md p-2 flex text-xl items-center gap-2 shadow-inner shadow-zinc-950"
        onClick={() => setRenderPage('home')}
      >
        <i>
          <img src={arrowLeft} alt="voltar" width={20} />
        </i>
        Voltar
      </button>

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
          >
            <i>
              <img src={plus} alt="icon atualizar" width={25} />
            </i>
            Criar produto
          </button>
        </div>

        <table className="bg-zinc-50 shadow-md rounded-md w-full text-center my-10 text-xl">
          <tr className="h-12">
            <th>Codigo</th>
            <th>Nome</th>
            <th>Valor de venda</th>
            <th>Estoque atual</th>
          </tr>

          <tr className="h-10 border-solid border-b-2">
            <td>000000000</td>
            <td>teste</td>
            <td>99</td>
            <td>000</td>
            <input type="checkbox" className="w-6 h-5 mt-2" />
          </tr>

          <tr className="h-10 border-solid border-b-2">
            <td>000000000</td>
            <td>teste</td>
            <td>99</td>
            <td>000</td>
            <input type="checkbox" className="w-6 h-5 mt-2" />
          </tr>

          <tr className="h-10 border-solid border-b-2">
            <td>000000000</td>
            <td>teste</td>
            <td>99</td>
            <td>000</td>
            <input type="checkbox" className="w-6 h-5 mt-2" />
          </tr>
        </table>

        <div className="flex gap-4 justify-end text-zinc-50">
          <button
            type="button"
            aria-label="Visualizare produto"
            className="bg-yellow-500 flex items-center text-xl font-semibold gap-2 p-2 rounded-md"
          >
            <i>
              <img src={eye} alt="icon olho" width={25} />
            </i>
            Visualizar
          </button>

          <button
            type="submit"
            aria-label="Editar produto"
            className="bg-blue-700 flex items-center text-xl font-semibold gap-2 p-2 rounded-md"
          >
            <i>
              <img src={pencil} alt="icon olho" width={25} />
            </i>
            Editar
          </button>

          <button
            type="submit"
            aria-label="Deletar produto"
            className="bg-red-600 flex items-center text-xl font-semibold gap-2 p-2 rounded-md"
          >
            <i>
              <img src={xCircle} alt="icon olho" width={25} />
            </i>
            Deletar
          </button>
        </div>
      </div>

      <div className="w-full text-center">
        <h2>Mostrando 1 - 1 de resultados</h2>
        <button>inicio</button>
        <button>proximo left</button>
        <span>atual</span>
        <button>proximo rigth</button>
        <button>final</button>
      </div>
    </section>
  )
}
