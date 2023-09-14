import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signInUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        signInUser(email, password).then(() => {
            navigate("/");
        });
    }

    return (
        <Container>
            <center>
                <h2>Login</h2>
            </center>
            <Form onSubmit={handleSubmit} style={{ color: "white", margin: "20px" }}>
                <Form.Group style={{ margin: "20px" }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group style={{ margin: "20px" }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" // Use type="password" for password input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row>
                <Button className="col-4" type="submit">Login</Button>
                <div className="col-4"/>
                <Link className="col-4" to="/create-account">Create an Account</Link>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;
