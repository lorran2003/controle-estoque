import { useState } from 'react'
import { Home } from './page/Home'
import { Product } from './page/Product'

export function App() {
  const [renderPage, setRenderPage] = useState('home')

  let Page = () => {
    switch (renderPage) {
      case 'home':
        return <Home setRenderPage={setRenderPage} />

      case 'product':
        return <Product backHomePage={setRenderPage} />
    }
  }

  return (
    <main>
      <Page />
    </main>
  )
}
