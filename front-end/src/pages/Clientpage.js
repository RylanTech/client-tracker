import { Card, Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/clientContext";

function ClientsPage() {
    const [client, setClient] = useState()

    const params = useParams()
    let clientId = params.id

    const { getClient } = useContext(ClientContext)

    useEffect(() => {
        async function gettingClient() {
            const client = await getClient(clientId)
            setClient(client)
        }
        gettingClient()
    }, [])

    function clientInfo() {
        if (client) {
            console.log(client)
            return (
                <Card>
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
                    <Card.Body>
                        <h3>{client.name}</h3>
                        {client.email}
                    </Card.Body>
                </Card>
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
export default ClientsPage