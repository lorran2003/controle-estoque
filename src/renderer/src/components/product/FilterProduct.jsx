import search from '../../assets/icons/search.svg'
export function FilterProduct() {
  return (
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
  )
}
