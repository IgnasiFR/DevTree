import {Link} from 'react-router-dom'
export default function RegisterView() {
  return (
    <>
        <div className='text-2xl'>RegisterView</div>
        <nav>
        <Link to ="/auth/login">
            ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        </nav>
    </>
  )
}
