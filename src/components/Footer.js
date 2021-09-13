import {Row, Col, Container} from "react-bootstrap"
export default function Footer(){
    return(
        <Container style={{position: "fixed", bottom:0, textAlign:"center"}}><Row className="text-center"><Col className="text-center"><a href="github.com/ritallopes">ritallopes</a></Col></Row></Container>
    )
}
