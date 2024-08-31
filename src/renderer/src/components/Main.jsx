import { faBox, faBoxesPacking, faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Card } from './Card'
import { faDropbox } from '@fortawesome/free-brands-svg-icons'
export function Main() {
  return (
    <section className="p-10 ">
      <h1 className="pl-10 text-3xl">Atalhos</h1>

      <nav className="flex justify-between items-center flex-wrap p-4 gap-4">
        <Card
          icon={faBoxesPacking}
          title="Cadastro de produtos"
          textButton="Cadastrar"
          route="/home/products"
        />

        <Card
          icon={faDropbox}
          title="Gerenciar entrada de produtos"
          textButton="Entrada"
          route="/home/menage-products-entries"
        />

        <Card
          icon={faBox}
          title="Gerenciar saída de produtos"
          textButton="Saída"
          route="/home/menage-products-outputs"
        />

        <Card
          icon={faFileAlt}
          title="Relatório"
          textButton="Relatório"
          route="/home"
        />

        <Card
          icon={faUsers}
          title="Clientes"
          textButton="Clientes"
          route="/home"
        />
      </nav>
    </section>
  )
}
