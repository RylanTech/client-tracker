import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/clientContext";
import { GigContext } from "../context/gigContext";
import { Link } from "react-router-dom";

function Homepage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [clientId, setClientId] = useState()
    const [features, setFeatures] = useState([{ name: '' }]);
    const [gigName, setGigName] = useState()
    const [gigs, setGigs] = useState()
    const [clients, setClients] = useState()
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [nameSearch, setNameSearch] = useState()
    const [cliArr, setClientArr] = useState()

    const { getClients, searchClients } = useContext(ClientContext)
    const { addGig, getGigs } = useContext(GigContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function gettingGigs() {
            let ggs = await getGigs()
            setGigs(ggs)
        }
        gettingGigs()
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

    const handleAddFeature = () => {
        setFeatures([...features, { name: '' }]);
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = [...features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    };


    function addaGig() {

        const gig = {
            gigFeatures: features,
            gigName: gigName,
            clientId: clientId,
            gigCost: 0,
            gigValue: 0,
            gigTimeSpent: 0,
        }
        addGig(gig)
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
        SelectAClient()
    }

    const handleFeatureChange = (index, newName) => {
        const updatedFeatures = [...features];
        updatedFeatures[index].name = newName;
        updatedFeatures[index].completed = false;
        setFeatures(updatedFeatures);
    };

    const renderFormGroups = () => {
        return features.map((feature, index) => (
            <>
                <Form.Group key={index}>
                    <Container>
                        <Row>
                            <Form.Label className="col-12">Feature {index + 1}</Form.Label>
                            <div className="col-9">
                                <Form.Control
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                />
                                <br />
                            </div>
                            <div className="col-3">
                                <Button variant="danger" onClick={() => handleRemoveFeature(index)}>
                                    Remove
                                </Button>
                            </div>
                        </Row>
                    </Container>
                </Form.Group>
            </>
        ));
    };

    function mapGigs() {
        if (gigs) {

            return gigs.map((gig, index) => {
                return (
                    <>
                        <Link 
                        className="projectTab"
                        to={`/project/${gig.gigId}`}
                        >
                            <div key={index} className="gigItem col-12">
                                <Row>
                                    <div className="projectTabContent">
                                        <Row>
                                            <h5 className="col-4">{gig.gigName}</h5>
                                            <div className="col-4">
                                                Total Costs: ${gig.gigCost}
                                            </div>
                                            <div className="col-4">
                                                Client: {gig.client.name}
                                            </div>
                                        </Row>
                                    </div>
                                </Row>
                            </div>
                        </Link>
                    </>
                )
            })
        }
    }


    function SelectAClient() {
        if (clients) {
            let cliArray = clients.map((client) => (
                <div key={client.clientId}>
                    <Button
                        onClick={() => {
                            setClientId(client.clientId);
                            setIsBtnDisabled(false)
                            setNameSearch(client.name)
                            setClientArr(null)
                        }}
                        className="col-5 clientCardSelect"
                    >
                        {client.name}
                    </Button>
                </div>
            ));
            setClientArr(cliArray)
        }
    }

    function topBar() {

        if (windowWidth <= 992) {
            return (
                <div className="col-12 col-lg-4">
                    <Row>
                        <div className="col-4">
                            <Button
                                className="col-12"
                                onClick={() => setShow(true)}
                            >
                                New Project
                            </Button>
                        </div>
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
                                    onChange={(e) => {
                                        searchClient(e.target.value)
                                        setNameSearch(e.target.value)
                                    }}
                                    value={nameSearch}
                                />
                                <div className="clients col-5">
                                    {cliArr}
                                </div>
                            </Form.Group>
                            {renderFormGroups()}
                            <br /><br /><br /><br />
                            <div className="col-6">
                                <Button className="col-12" onClick={handleAddFeature}>Add Feature</Button>
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        disabled={isBtnDisabled}
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