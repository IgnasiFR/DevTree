import {Link} from 'react-router-dom'

export default function LoginView() {
  return (
    <>
        <div className="text-2xl">LoginView</div>

        <nav>
            <Link to ="/auth/register">
                ¿No tienes cuenta? Crea una aquí
            </Link>
        </nav>

    </>

  )
}
