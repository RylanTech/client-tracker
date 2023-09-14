import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

function Homepage() {
    
    return (
        <>
        <NavigationBar/>
        <Container>
            
        </Container>
        </>
    )
}
export default Homepage