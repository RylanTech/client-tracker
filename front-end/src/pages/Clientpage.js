import { Button, Card, Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { Link, useParams } from "react-router-dom";
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
            if (!client.imageUrl) {
                client.imageUrl = "https://cse.umn.edu/sites/cse.umn.edu/themes/custom/cse/img/person_placeholder.png"
            }
            return (
                <>
                    <div className="clientCard">
                        <Row>
                            <div className="col-lg-2" />
                            <img className="col-12 col-md-6 col-lg-4 clientImg"
                                src={client.imageUrl}
                            />
                            <div className="col-12 col-md-6">
                                <h2>
                                    {client.name}
                                </h2>
                                <h6>
                                    {client.email}
                                </h6>
                                <h6>
                                    {client.number}
                                </h6>
                                <div className="clientLinks">
                                    <Row>
                                        <a href={`mailto:${client.email}`}>
                                            <Button className="col-12 col-lg-8 emailLink">
                                                <Row>
                                                <img className="col-3 col-md-2 emailImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/800px-Gmail_icon_%282020%29.svg.png" />
                                                <div className="col-6 btntxt">
                                                    Email Client
                                                </div>
                                                <div className="col-2"/>
                                                </Row>
                                            </Button>
                                        </a>
                                    </Row>
                                    <Row>
                                        <a href={`tel:${client.number}`}>
                                            <Button className="col-12 col-lg-8 emailLink">
                                                <Row>
                                                <img className="col-3 col-md-2 emailImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Phone_font_awesome.svg/2048px-Phone_font_awesome.svg.png" />
                                                <div className="col-6 btntxt">
                                                    Call Client
                                                </div>
                                                <div className="col-2"/>
                                                </Row>
                                            </Button>
                                        </a>
                                    </Row>
                                    <Row>
                                        <Link to={`/client/edit/${client.clientId}`}>
                                            <Button className="col-12 col-lg-8 emailLink">
                                                <Row>
                                                <img className="col-3 col-md-2 emailImg" src="https://www.svgrepo.com/show/73131/edit-button.svg" />
                                                <div className="col-6 btntxt">
                                                    Edit Client
                                                </div>
                                                <div className="col-2"/>
                                                </Row>
                                            </Button>
                                        </Link>
                                    </Row>
                                    
                                </div>
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
export default ClientsPage