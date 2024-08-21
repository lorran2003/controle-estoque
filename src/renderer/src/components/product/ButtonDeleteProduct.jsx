import xCircle from '../../assets/icons/x-circle.svg'

export function ButtonDeleteProduct() {
  return (
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
  )
}
