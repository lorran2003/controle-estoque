/* eslint-disable react/prop-types */
import iconBoxes from '../assets/icons/boxes.svg'
import iconBox from '../assets/icons/box.svg'
import file from '../assets/icons/file-earmark-text.svg'
import iconDropBox from '../assets/icons/dropbox.svg'
import people from '../assets/icons/people.svg'
import { Link } from 'react-router-dom'
export function Main() {
  return (
    <section className="p-10 ">
      <h1 className="pl-10 text-3xl">Atalhos</h1>

      <nav className="flex justify-between items-center flex-wrap p-4 gap-4">
        <div className="bg-zinc-50 w-72 text-zinc-800 text-xl flex p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-28 after:w-1 after:bg-[#daa520] before:block before:h-28 before:w-1 before:bg-[#daa520] gap-4 text-center">
          <div>
            <i>
              <img src={iconBoxes} alt="icon boxes" width={80} className="m-auto" />
            </i>

            <h2 className="py-4">Cadastro de produtos</h2>

            <Link
              to="/home/products"
              className="bg-[#DAA520] rounded-md p-1 text-zinc-50 hover:shadow-inner hover:shadow-black duration-300"
            >
              Cadastrar
            </Link>
          </div>
        </div>

        <div className="bg-zinc-50 w-72 text-zinc-800 text-xl flex p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-28 after:w-1 after:bg-[#daa520] before:block before:h-28 before:w-1 before:bg-[#daa520] gap-4 text-center">
          <div>
            <i>
              <img src={iconDropBox} alt="icon boxes" width={80} className="m-auto" />
            </i>

            <h2 className="py-4">Gerenciar entrada de produtos</h2>

            <Link
              to="/home/menage-products"
              className="bg-[#DAA520] rounded-md p-1 text-zinc-50 hover:shadow-inner hover:shadow-black duration-300"
            >
              Entrada
            </Link>
          </div>
        </div>

        <div className="bg-zinc-50 w-72 text-zinc-800 text-xl flex p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-28 after:w-1 after:bg-[#daa520] before:block before:h-28 before:w-1 before:bg-[#daa520] gap-4 text-center">
          <div>
            <i>
              <img src={iconBox} alt="icon boxes" width={80} className="m-auto" />
            </i>

            <h2 className="py-4"> Gerenciar saída de produtos</h2>

            <a href="#">
              {' '}
              <span className="bg-[#DAA520] rounded-md p-1 text-zinc-50">Saída</span>
            </a>
          </div>
        </div>

        <div className="bg-zinc-50 w-72 text-zinc-800 text-xl flex justify-between p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-28 after:w-1 after:bg-[#daa520] before:block before:h-28 before:w-1 before:bg-[#daa520] gap-4 text-center">
          <div>
            <i>
              <img src={file} alt="icon boxes" width={80} className="m-auto" />
            </i>

            <h2 className="py-4">Relatório</h2>

            <a href="#">
              {' '}
              <span className="bg-[#DAA520] rounded-md p-1 text-zinc-50">Relatório</span>
            </a>
          </div>
        </div>

        <div className="bg-zinc-50 w-72 text-zinc-800 text-xl flex justify-between p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-28 after:w-1 after:bg-[#daa520] before:block before:h-28 before:w-1 before:bg-[#daa520] gap-4 text-center">
          <div>
            <i>
              <img src={people} alt="icon boxes" width={80} className="m-auto" />
            </i>

            <h2 className="py-4"> Clientes </h2>

            <a href="#">
              {' '}
              <span className="bg-[#DAA520] rounded-md p-1 text-zinc-50">Clientes</span>
            </a>
          </div>
        </div>
      </nav>
    </section>
  )
}
