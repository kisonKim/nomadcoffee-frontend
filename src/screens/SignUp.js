import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const Subtitle = styled(FatLink)`
  font-size:16px;
  text-align:center;
  margin-top:10px;
`;


const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title={"sign up"} />
      
      <FormBox>
        
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input 
            {...register('firstname',{
              required:"First Name is required"
            })}
          type="text" name="firstname" placeholder="First Name" />
          <Input 
            {...register('lastname',{
              required:"Last Name is required"
            })}
          type="text" name="lastname" placeholder="Last Name" />
          <Input 
            {...register('email',{
              required:"Email is required"
            })}
          type="text" name="email" placeholder="Email" />
          <Input 
            {...register('username',{
              required:"Username is required"
            })}
          type="text" name="username" placeholder="Username" />
          <Input 
            {...register('password',{
              required:"Password is required"
            })}
          type="password" name="password" placeholder="Password" />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Sign up" link={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;