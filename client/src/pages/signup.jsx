import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations'
import { useMutation } from "@apollo/client"
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, {error}] = useMutation(ADD_USER);

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
console.log(userFormData);
    try {
      const { data } = await addUser ({ variables: { ...userFormData }})
   
console.log(data);

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
   
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="signupcont mt-6">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Sign Up</h1>
                                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                                        Something went wrong with your signup!
                                    </Alert>

                                    <Form.Group className='mt-3' controlId="username">
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={userFormData.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='mt-3' controlId="email">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={userFormData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='mt-3' controlId="password">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={userFormData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                                    </Form.Group>

                                    <Button className='mt-3' variant="primary" type="submit" disabled={!(userFormData.username && userFormData.email && userFormData.password)}>
                                        Submit
                                    </Button>
                                </Form>

                                <p className="mt-3 text-center">
                                    Already have an account? <Link to="/login">Log in here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
};


export default SignupForm;
