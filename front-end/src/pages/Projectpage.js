import { Card, Container, Row } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GigContext } from "../context/gigContext"

function Projectpage() {
    const [project, setProject] = useState([])

    const { getGig } = useContext(GigContext)
    let params = useParams()

    useEffect(() => {
        async function gettingGig() {
            let i = await getGig(params.id)
            console.log(i)
            setProject(i)
        }
        gettingGig()
    }, [])

    function mapThroughFeatures(features) {
        if (features) {
            return features.map((feature) => {
                return (
                    <>
                        <div className="col-8">
                            {feature.name}
                        </div>
                        {feature.completed ? (
                            <div className="isComplete col-4">
                                Completed
                            </div>
                        ) : (
                            <div className="isComplete col-4">
                                Not completed
                            </div>
                        )}
                        <br /><br />
                    </>
                )
            })
        }
    }

    function mapThroughGig() {
        if (project) {
            return (
                <>
                    <h2>Features</h2>
                    <Row>
                        {mapThroughFeatures(project.gigFeatures)}
                    </Row>
                </>
            )
        }
    }

    return (
        <>
            <NavigationBar />
            <Container>
            <h1>{project.gigName}</h1>
                <Row>
                    <div className="col-12 col-md-6">
                        <div className="features">
                            {mapThroughGig()}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="col-12">
                            <center>
                                <Link className="personLink" to={`/client/${project.clientId}`}>
                                    <Card>
                                        <Card.Body>
                                            {project.client ? (
                                                <>
                                                    <h3>{project.client.name}</h3>
                                                    {project.client.email}
                                                </>
                                            ) : (
                                                <>
                                                    Error
                                                </>
                                            )}
                                            <br />
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </center>
                            <br />
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default Projectpage