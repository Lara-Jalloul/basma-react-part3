import styled from "styled-components";
import { useContext, useState } from "react";
import SessionContext from "../context/SessionContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    // url("https://ak.picdn.net/shutterstock/videos/1077750071/thumb/8.jpg?ip=x480")
    //   center;
  background-size: cover;
  background-image:linear-gradient(white, red);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #faf0e6;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #dc143c;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: black;
    border: 1px solid black;
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
//   color: black;
//   &:hover{
//     color:#ff546e;
//   }
// `;

const Login = () => {
  const {
    actions: { login },
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    login(email, password);
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
            name="password"
            required
          />
          <Button>LOGIN</Button>
        </Form>
       
      </Wrapper>
    </Container>
  );
};

export default Login;
