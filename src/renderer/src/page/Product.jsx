import { useState } from 'react'
import house from '../assets/icons/house.svg'
import { ViewProduct } from '../components/ViewProduct'
import { CreateProduct } from '../components/CreateProduct'
/* eslint-disable react/prop-types */
export function Product({ backHomePage }) {
  const [renderComponet, setRenderComponent] = useState('products')

  const RenderComponent = () => {
    switch (renderComponet) {
      case 'createProduct':
        return <CreateProduct backPage={setRenderComponent} />
      default:
        return <ViewProduct createProduct={setRenderComponent} />
    }
  }
  return (
    <section className="p-10">
      <button
        aria-label="voltar para pagina inicial"
        type="button"
        className="bg-red-600 text-zinc-50 rounded-md p-2 flex text-xl items-center gap-2 shadow-inner shadow-zinc-950"
        onClick={() => backHomePage('home')}
      >
        <i>
          <img src={house} alt="voltar" width={20} />
        </i>
        Inicio
      </button>

      <RenderComponent />
    </section>
  )
}
