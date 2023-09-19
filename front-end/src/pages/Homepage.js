import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/clientContext";
import { Link } from "react-router-dom";

function Homepage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [query, setQuery] = useState()
    const [show, setShow] = useState(false);
    const [gigId, setGigId] = useState()
    const [userId, setUserId] = useState()
    const [clientId, setClientId] = useState()
    const [gigValue, setGigValue]= useState()
    const [gigCost, setGigCost] = useState()
    const [gigFeatures, setGigFeatures] = useState()
    const [gigTimeSpent, setGigTimeSpent] = useState()
    const [gigName, setGigName] = useState()
    const [gigs, setGigs] = useState()
    const [clients, setClients] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getClients, searchClients } = useContext(ClientContext)

    // useEffect(() => {
    //     async function getCli() {
    //         const cli = await getClients()
    //         setClients(cli)
    //     }
    //     getCli()
    // }, [])

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

    function addaGig() {
        // const client = {
        //     name: name,
        //     email: email,
        //     imageUrl: imageUrl,
        //     number: number
        // }
        // addClient(client)
    }

    async function search(value) {
        // if (value === "") {
        //     async function getCli() {
        //         const cli = await getClients()
        //         setClients(cli)
        //     }
        //     getCli()
        // } else {
        //     let cli = await searchClients(value)
        //     setClients(cli)
        // }
    }

    async function searchClient(value) {
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

    function mapGigs() {
        if (gigs) {
            return gigs.map((gig) => {
                
                return (
                    <>
                        <div className="gigItem col-12">
                            <h5>{gig.name}</h5>
                        </div>
                    </>
                )
            })
        }
    }

    function SelectAClient() {
        if (clients) {
            return clients.map((client) => {
                return (
                    <>
                    <div className="col-5 clientCard">
                        {client.name}
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
                            New Project
                        </Button>
                        <div className="col-8">
                            <Form.Control
                                placeholder="Search for a Project"
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
                                placeholder="Search for a Project"
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
                            New Project
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
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form.Group className="col-6">
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => setGigName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label>Client</Form.Label>
                                <Form.Control
                                    onChange={(e) => searchClient(e.target.value)}
                                />
                                {SelectAClient()}
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
                            addaGig()
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
                            {mapGigs()}
                        </Row>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default Homepage