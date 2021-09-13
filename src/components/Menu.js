import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Entrega from "./Entrega";
import Aluno from "./Aluno";
import AlunoProfile from "./Aluno/AlunoProfile";
import Material from "./Material";
import Dashboard from "./Dashboard";

export default function Menu() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">SUPERLOG.LOG</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/entrega">Entregas</Nav.Link>
              <Nav.Link href="/material">Materiais</Nav.Link>
              <Nav.Link href="/aluno">Alunos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/aluno/:id">
          <AlunoProfile />
        </Route>
        
        <Route path="/material">
          <Material />
        </Route>
        <Route path="/aluno">
          <Aluno />
        </Route>

        <Route path="/">
          <Entrega />
        </Route>
      </Switch>
    </Router>
  );
}
