import iconExclamition from '../assets/icons/exclamation-triangle-fill.svg'
import iconBoxes from '../assets/icons/boxes.svg'
import iconMoney from '../assets/icons/money.svg'

export function Header() {
  return (
    <section className="p-10 text-3xl">
      <h1 className="pl-10 text-zinc-800">Dashboard</h1>

      <nav className="navHearder flex justify-between items-center p-4 flex-wrap gap-4">
        <a
          href="#"
          className="flex bg-zinc-50 text-yellow-400 text-xl p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-20 after:w-1 after:bg-yellow-400 gap-2"
        >
          <div>
            <div className="flex justify-center items-center gap-4 max-w-80">
              <h2>Produtos com estoque baixo</h2>
              <i>
                <img src={iconExclamition} alt="icon aviso" width={60} />
              </i>
            </div>
            <span className="text-zinc-800 text-2xl">00</span>
          </div>
        </a>

        <a
          href="#"
          className="flex bg-zinc-50 text-blue-300 text-xl p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-20 after:w-1 after:bg-blue-300 gap-2"
        >
          <div>
            <div className="flex justify-center items-center gap-4 max-w-80">
              <h2>Quantidade de produtos no estoque</h2>
              <i>
                <img src={iconBoxes} alt="icon boxes" width={60} />
              </i>
            </div>
            <span className="text-zinc-800 text-2xl">00</span>
          </div>
        </a>

        <a
          href="#"
          className="flex bg-zinc-50 text-green-400 text-xl p-4 font-bold shadow-sm shadow-zinc-800 rounded-lg after:block after:h-20 after:w-1 after:bg-green-400 gap-2"
        >
          <div>
            <div className="flex justify-center items-center gap-4 max-w-80">
              <h2>Custo total de produtos</h2>
              <i>
                <img src={iconMoney} alt="icon boxes" width={60} />
              </i>
            </div>
            <span className="text-zinc-800 text-2xl">00</span>
          </div>
        </a>
      </nav>
    </section>
  )
}
