import reload from '../../assets/icons/reload.svg'

export function ButtonUpdatePageProducts() {
  return (
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
  )
}
