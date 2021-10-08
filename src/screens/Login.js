import { isLoggedInVar } from "../apollo";

const Login = (props) => {
  return ( 
    <div>
      <h1>Login</h1>
      <button onClick={()=>isLoggedInVar(true)}>Log in Now!</button>
    </div>
  )
}

export default Login;