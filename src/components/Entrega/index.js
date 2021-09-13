import { Container, Table, Row, Col } from "react-bootstrap";
import { useState } from "react";
import useEntregas from "../../hooks/entregas-hooks";
import useMateriais from "../../hooks/materiais-hooks";
import useAlunos from "../../hooks/alunos-hooks";
import Entrega from "./Entrega";
import EntregaForm from "./EntregaForm";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";

export default function EntregaList() {
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("list");
  const { materiais } = useMateriais([]);
  const { alunos } = useAlunos([]);
  const { entregas, adicionarEntrega, atualizarEntrega, removerEntrega } = useEntregas(
    []
  );

  function editEntrega(index) {
    setMode("edit");
    setCurrent(index);
  }
  const addEntrega = () => {
    adicionarEntrega();
    setMode("add");
    setCurrent(entregas.length);
  };
  const deleteEntrega = index => {
    removerEntrega(entregas[index]._id);
  };

  const saveChanges = entrega => {
    atualizarEntrega(entrega, entregas[current]._id);
    setMode("list");
    setCurrent(current);
  };

  const cancelChanges = () => {
    if (mode === "add") {
      removerEntrega(entregas.length - 1);
    }
    setMode("list");
  };

  const toList = () => {
    setMode("list");
  };

  return (
    <Container>
      {mode === "list" && (
        <Row className="title_page">
          <Col xl={8} className="text-center">Entregas Realizadas pelo Superlog</Col>
          <Col  xl={4}> <BsFillPlusCircleFill onClick={addEntrega}/></Col>
          </Row>
      )}
      <Row>
        {mode === "list" && (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Data</th>
                <th>Aluno</th>
                <th>Responsavel</th>    
                <th>Materiais</th>                
                <th>Forma de Pagamento</th>
                <th>Valor Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((entrega, i) => (
                <Entrega
                  key={`entrega__${i}`}
                  index={i}
                  entrega={entrega}
                  alunos={alunos}
                  materiais={materiais}
                  onDelete={index => {
                    deleteEntrega(index);
                  }}
                  onEdit={index => {
                    editEntrega(index);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}

        {(mode === "edit" || mode === "add") && (
         <EntregaForm entrega={entregas[current]} onUpdate = {(entrega) => saveChanges(entrega)} onExit = {() => cancelChanges()} />
        )}
      </Row>
    </Container>
  );
}
