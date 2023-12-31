import { Button, Card, Container, Form, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/clientContext";

function EditClient() {
    const [client, setClient] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [number, setNumber] = useState()

    const params = useParams()
    let clientId = params.id
    const navigate = useNavigate()

    const { getClient, editClient, deleteClient } = useContext(ClientContext)

    useEffect(() => {
        async function gettingClient() {
            const client = await getClient(clientId)
            setClient(client)
            setName(client.name)
            setEmail(client.email)
            setImageUrl(client.imageUrl)
            setNumber(client.number)
        }
        gettingClient()
    }, [])

    function submit() {
        const cli = {
            clientValue: client.clientValue,
            clientId: client.clientId,
            userId: client.userId,
            name: name,
            email: email,
            imageUrl: imageUrl,
            number: number
        }
        if (cli.imageUrl === "") {
            cli.imageUrl = null
        }

        editClient(cli)
        navigate(`/client/${clientId}`)
    }

    async function removeClient() {
        let i = deleteClient(clientId)
        if (i) {
            navigate(`/clients/`)
        }
    }

    function clientInfo() {
        if (client) {
            return (
                <>
                    <div className="clientCard">
                        <Row>
                            <div className="col-lg-2" />
                            <div className="col-6 col-lg-4">
                            <Row>
                            {client.imageUrl ? (
                                <img className=" clientImg"
                                src={client.imageUrl}
                                />
                            ) : (
                                <img className=" clientImg"
                                src="https://cse.umn.edu/sites/cse.umn.edu/themes/custom/cse/img/person_placeholder.png"
                            />
                            )}
                            </Row>
                            </div>
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    <Form.Label>ImageUrl</Form.Label>
                                    <Form.Control
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </Form.Group>
                                <br/>
                                <Button
                                className="col-12"
                                onClick={submit}
                                >
                                    Save
                                </Button>
                                <br/><br/>
                                <Button
                                className="col-12"
                                onClick={removeClient}
                                variant="danger"
                                >
                                    remove
                                </Button>
                            </div>
                        </Row>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    {clientInfo()}
                </Row>
            </Container>
        </>
    )
}
export default EditClient