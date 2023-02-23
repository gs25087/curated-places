import { useAuth } from '@/auth/useAuth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Signup = () => {
  const { signup } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
      //@ts-ignore
    } catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto'
      }}
    >
      <h1 className="my-3 text-center ">Signup</h1>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value
              })
            }
            value={data.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value
              })
            }
            value={data.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
