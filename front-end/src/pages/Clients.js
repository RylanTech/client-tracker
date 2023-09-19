import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/clientContext";
import { Link } from "react-router-dom";

function Clients() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [query, setQuery] = useState()
    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [clients, setClients] = useState()
    const [number, setNumber] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { addClient, getClients, searchClients } = useContext(ClientContext)

    useEffect(() => {
        async function getCli() {
            const cli = await getClients()
            setClients(cli)
        }
        getCli()
    }, [])

    useEffect(() => {

        // Update windowWidth when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function addaClient() {
        const client = {
            name: name,
            email: email,
            imageUrl: imageUrl,
            number: number
        }
        addClient(client)
    }

    async function search(value) {
        if (value === "") {
            async function getCli() {
                const cli = await getClients()
                setClients(cli)
            }
            getCli()
        } else {
            let cli = await searchClients(value)
            setClients(cli)
        }
    }

    function mapClients() {
        if (clients) {
            return clients.map((client) => {
                
                return (
                    <>
                        <div className="col-12 col-sm-6">
                            <Link className="personLink" to={`/client/${client.clientId}`}>
                                <Card>
                                    {client.imageUrl ? (
                                        <Card.Header>
                                        <Row>
                                            <center>
                                                <img
                                                    className="col-8 clientImg"
                                                    src={client.imageUrl}
                                                />
                                            </center>
                                        </Row>
                                    </Card.Header>
                                    ) : (
                                        <></>
                                    )}
                                    <Card.Body>
                                        <h3>{client.name}</h3>
                                        {client.email}
                                    </Card.Body>
                                </Card>
                            </Link>
                            <br />
                        </div>
                    </>
                )
            })
        }
    }

    function topBar() {

        if (windowWidth <= 992) {
            return (
                <div className="col-12 col-lg-4">
                    <Row>
                        <Button
                            className="col-4 col-lg-12"
                            onClick={() => setShow(true)}
                        >
                            New Client
                        </Button>
                        <div className="col-8">
                            <Form.Control
                                placeholder="Search for a Client"
                                onChange={(e) => search(e.target.value)}
                            />
                        </div>
                    </Row>
                    <br />
                </div>
            )
        } else {
            return (
                <>
                    <div className="col-12">
                        <div className="col-12">
                            <Form.Control
                                placeholder="Search for a Client"
                                onChange={(e) => search(e.target.value)}
                            />
                            <br />
                        </div>
                    </div>
                    <div className="col-4">
                        <Button
                            className="col-12"
                            onClick={() => setShow(true)}
                        >
                            New Client
                        </Button>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <NavigationBar />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form.Group className="col-5">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="col-7">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label>imageUrl</Form.Label>
                                <Form.Control
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            addaClient()
                            handleClose()
                            window.location.reload()
                        }}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row>
                    {topBar()}
                    <div className="col-12 col-lg-8">
                        <Row>
                            {mapClients()}
                        </Row>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default Clients