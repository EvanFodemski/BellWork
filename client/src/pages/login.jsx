import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value, 
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: {...formState},
            });
            auth.login(data.login.token);
        } catch(err) {
            console.error(err, 'Something went wrong when trying to login!')
        }
        setFormState({
            email: '',
            password: '',
          });
    };

    return (
        <main className="login-container"> 
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                {data ? (
                                    <p>
                                        You're logged in! You may now head{' '}
                                        <Link to="/" className="text-decoration-none">back to the homepage.</Link>
                                    </p>
                                ) : (
                                    <Form onSubmit={handleFormSubmit}>
                                        <h1>Log In:</h1>
                                        <Form.Group className='mt-3' controlId="email">
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className='mt-3' controlId="password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={formState.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Button className='mt-3' variant="primary" type="submit" style={{ cursor: 'pointer' }}>
                                            Submit
                                        </Button>

                                        <p className="mt-3 text-center">
                                            Don't have an account? <Link to="/signup">Sign up here</Link>
                                        </p>
                                    </Form>
                                )}

                                {error && (
                                    <Alert variant="danger">{error.message}</Alert>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

    
};

export default Login;