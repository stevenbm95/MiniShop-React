
import LoginForm from '../../components/auth/LoginForm'
// import RegisterForm from '../../components/auth/RegisterForm'

const AuthPage = () => {
  return (
    <div className='container mx-auto bg-slate-800 text-white rounded flex m-5'>
      <div className='flex-[0.5] flex justify-center items-center border-r-2 border-white opacity-[.7]'>
        <h1 className='text-4xl font-bold'>MiniShop</h1>
      </div>
      <div className='flex-1 flex flex-col justify-center'>
        <LoginForm />
        {/* <RegisterForm /> */}

      </div>
    </div>

  )
}

export default AuthPage