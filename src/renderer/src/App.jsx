import { Login } from './components/Login'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <main className="relative">
      <Login />
      <Outlet />
    </main>
  )
}
