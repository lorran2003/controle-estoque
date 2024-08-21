import pencil from '../../assets/icons/pencil.svg'

export function ButtonUpdateProduct() {
  return (
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
  )
}
