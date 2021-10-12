import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;


function Login() {
  const { register, handleSubmit, formState, getValues, setError,clearErrors } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  }
  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title={"Login"} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input 
            {...register('username',{
              required:"Username is required.", 
              minLength: {
                value : 5,
                message : "Username should be longer than 5 chars."
              },
              // pattern: "",
              // validate: async(currentValue) => currentValue.includes("potato")
            })}
            onFocus={clearLoginError}
            name="username"
            type="text" 
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)} />
            <FormError message = {formState.errors?.username?.message}  />
          <Input 
            {...register('password',{required:"Password is required."})}
            onFocus={clearLoginError}
            name="password"
            type="password" 
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)} />
          <FormError message = {formState.errors?.password?.message}  />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" linkText="Sign up" link={routes.signUp}>
      </BottomBox>
    </AuthLayout>
  );
}
export default Login;