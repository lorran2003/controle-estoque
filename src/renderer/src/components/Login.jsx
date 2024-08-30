import logo from '../assets/logo/logo.jpg'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock, faUser } from '@fortawesome/free-solid-svg-icons'

export function Login() {
  const [overflow, setOverFlow] = useState(false)
  useEffect(() => {
    if (overflow) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [overflow])
  return (
    <section
      className={
        'absolute w-full h-screen bg-zinc-800/95 flex flex-col justify-center items-center text-zinc-800 ' +
        (overflow ? 'hidden' : '')
      }
    >
      <div className="bg-[#eee] rounded-md p-5 shadow-md border-2 border-solid border-[#9E895F] text-center">
        <i className="relative bottom-1/4">
          <img
            src={logo}
            alt="logo marca"
            className="rounded-full m-auto shadow-md border-2 border-solid border-[#9E895F] w-28"
          />
        </i>

        <div className="relative bottom-1/4 text-xl text-center flex flex-col mt-4">
          <h1 className="pb-2 text-2xl">Bem vindo!</h1>

          <div className="flex justify-center items-center gap-2 py-6">
            <FontAwesomeIcon
              icon={faUser}
              className="text-[#9E895F] size-7 rounded-full m-auto shadow-md border-2 border-solid border-[#9E895F] p-2 bg-zinc-50"
            />
            <input
              type="text"
              placeholder="Digite seu login"
              className="rounded-md shadow-md p-1"
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon
              icon={faUserLock}
              className="text-[#9E895F] size-7 rounded-full m-auto shadow-md border-2 border-solid border-[#9E895F] p-2 bg-zinc-50"
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="rounded-md shadow-md p-1"
            />
          </div>
        </div>

        <Link
          to="/home"
          className="bg-zinc-50 shadow-md border-2 border-[#9E895F] text-[#9E895F] rounded-md w-28 m-auto text-xl p-2 hover:bg-zinc-800 hover:-translate-y-1 duration-300"
          onClick={() => setOverFlow(true)}
        >
          Entrar
        </Link>
      </div>
    </section>
  )
}
