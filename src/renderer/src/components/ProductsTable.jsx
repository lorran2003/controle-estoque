export function ProductsTable() {
  return (
    <table className="bg-zinc-50 shadow-md rounded-md w-full text-center my-10 text-xl">
      <tr className="h-12">
        <th>Codigo</th>
        <th>Nome</th>
        <th>Valor de venda</th>
        <th>Estoque atual</th>
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <td>000</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <td>000</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <td>000</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
    </table>
  )
}
