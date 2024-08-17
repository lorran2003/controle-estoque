/* eslint-disable react/prop-types */
import { Header } from '../components/Header'
import { Main } from '../components/Main'

export function Home({ setRenderPage }) {
  return (
    <section>
      <Header />
      <Main homePage={setRenderPage} />
    </section>
  )
}
