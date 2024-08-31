import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
export function FilterProduct() {
  return (
    <div className="flex gap-4 py-4">
      <input
        type="text"
        placeholder="Filtrar por nome ou codigo"
        className="p-2 px-4 rounded-md shadow-md w-full"
      />
      <Button
        route="/home"
        style="bg-green-400 text-zinc-50"
        text="Filtrar"
        icon={faMagnifyingGlass}
      />
    </div>
  )
}
