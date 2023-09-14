import { useContext, useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'


function NavigationBar() {

    const { verify } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        async function startUp() {
            const status = await verify()
        if (!status) {
            navigate("/login")
        }
        }
        startUp()
        
    }, [])

    return (
        <>
          <Navbar className="nav-color" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <h1 className="homeHead">CT</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
        </>
    )
}
export default NavigationBar