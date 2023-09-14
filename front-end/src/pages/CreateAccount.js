import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { createUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        createUser(email, password).then(() => {
            navigate("/login");
        });
    }

    return (
        <Container>
            <center>
                <h2>Create Account</h2>
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
                <Button className="col-4" type="submit">Create Account</Button>
                <div className="col-5"/>
                <Link className="col-3" to="/login">Login</Link>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateAccount;
