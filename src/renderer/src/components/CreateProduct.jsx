import arrowLeft from '../assets/icons/arrow-left.svg'
/* eslint-disable react/prop-types */
export function CreateProduct({ backPage }) {
  return (
    <section className="py-5">
      <button
        aria-label="voltar para pagina inicial"
        type="button"
        className="bg-red-600 text-zinc-50 rounded-md p-2 flex text-xl items-center gap-2 shadow-inner shadow-zinc-950"
        onClick={() => backPage('products')}
      >
        <i>
          <img src={arrowLeft} alt="voltar" width={20} />
        </i>
        Voltar
      </button>

      <div>
        <h1>Criar ou editar produto</h1>

        <label>Nome do produto</label>
        <input type="text" />

        <label>Código de barras</label>
        <input type="text" />

        <div>
          <div>
            <label>Estoque atual</label>
            <input type="text" />
          </div>

          <div>
            <label>Estoque minimo</label>
            <input type="text" />
          </div>
        </div>

        <label>Valor de venda</label>
        <input type="text" />

        <label>Valor de custo</label>
        <input type="text" />
      </div>
    </section>
  )
}
