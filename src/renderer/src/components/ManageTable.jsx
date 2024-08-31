export function ManageTable() {
  return (
    <table className="bg-zinc-50 shadow-md rounded-md w-full text-center my-10 text-xl">
      <tr className="h-12">
        <th>Data</th>
        <th>Produto</th>
        <th>Quantidade</th>
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
      <tr className="h-10 border-solid border-b-2">
        <td>000000000</td>
        <td>teste</td>
        <td>99</td>
        <input type="checkbox" className="w-6 h-5 mt-2" />
      </tr>
    </table>
  )
}
