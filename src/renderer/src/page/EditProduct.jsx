import { useEffect, useState } from 'react'
import { ButtonReturn } from '../components/ButtonReturn'

export function EditProduct() {
  const [productName, setProductName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [currentStock, setCurrentStock] = useState(1)
  const [minimumStock, setMinimumStock] = useState(1)
  const [priceSale, setpriceSale] = useState(1)
  const [priceCost, setpriceCost] = useState(1)
  const [productImage, setProductImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      const response = await window.productApi.findById(1)
      console.log(response)
      if (!response.error) {
        setPreviewImage(response.data.img)
      }
    }

    getProduct()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const productData = {
      code: barcode,
      name: productName,
      img: productImage,
      minimumStock,
      currentStock,
      priceSale,
      priceCost
    }

    const response = await window.productApi.create(productData)
    console.log(response)
  }

  return (
    <section className="py-8 px-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <ButtonReturn route="/home/products" />

      <form onSubmit={handleSubmit} className="mt-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Editar produto</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nome do produto</label>
          <input
            type="text"
            placeholder="Digite o nome aqui..."
            autoFocus="true"
            maxLength={255}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Código</label>
          <input
            type="text"
            maxLength={6}
            placeholder="Digite o código, ex: A1B2C3"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Estoque atual</label>
            <input
              type="number"
              min={1}
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Estoque mínimo</label>
            <input
              type="number"
              value={minimumStock}
              min={1}
              onChange={(e) => setMinimumStock(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Valor de venda</label>
          <input
            min={1}
            type="number"
            value={priceSale}
            onChange={(e) => setpriceSale(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Valor de custo</label>
          <input
            type="number"
            min={1}
            value={priceCost}
            onChange={(e) => setpriceCost(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Imagem do produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={((e) => {
              console.log(e.target.files[0].path)
              setProductImage(e.target.files[0].path)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {previewImage && (
            <img
              src={'app://' + previewImage}
              alt="Pré-visualização do produto"
              className="mt-4 max-h-48 rounded-md shadow-md"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white rounded-md px-4 py-2 shadow hover:bg-red-700"
        >
          Cadastrar Produto
        </button>
      </form>
    </section>
  )
}
