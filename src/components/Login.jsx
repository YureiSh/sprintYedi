import React, { useState, useEffect } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const dbData = {
    email: "esdeekid@hmail.com",
    password: "12345",
}

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        terms: false,
    });

    const history = useHistory();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (
            validateEmail(form.email) &&
            form.password.trim().length >= 4 &&
            form.terms
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [form]);

    const handleChange = (event) => {
        let { name, value, type, checked } = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        setForm({ ...form, [name]: value });

        if (name === 'email') {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }
        if (name === 'password') {
            if (value.trim().length >= 4) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }
        if (name === 'terms') {
            if (value) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;

        if (dbData.password == form.password && dbData.email == form.email) {
            setForm(initialForm);

            history.push('/success');
        }else{
            return;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    data-cy="form-email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    invalid={errors.email}
                />
                {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    id="examplePassword"
                    name="password"
                    data-cy="form-password"
                    placeholder="Enter your password "
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                    invalid={errors.password}
                />
                {errors.password && (
                    <FormFeedback>{errorMessages.password}</FormFeedback>
                )}
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    data-cy="form-terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                    invalid={errors.terms}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup className="text-center p-4">
                <Button disabled={!isValid} color="primary">
                    Sign In
                </Button>
            </FormGroup>
        </Form>
    );
}
