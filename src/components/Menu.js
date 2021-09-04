import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import EntregaList from "./EntregaList";
import AlunoList from "./AlunoList";
import MaterialList from "./MaterialList";

export default function Menu() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Entregas Material Escolar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/entrega">Entrega</Nav.Link>
              <Nav.Link href="/material">Material</Nav.Link>
              <Nav.Link href="/aluno">Aluno</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/entrega">
          <EntregaList />
        </Route>
        <Route path="/material">
          <MaterialList />
        </Route>
        <Route path="/aluno">
          <AlunoList />
        </Route>
      </Switch>
    </Router>
  );
}
