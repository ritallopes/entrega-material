import { Container, Table, Row, Col } from "react-bootstrap";
import { useState } from "react";
import useAlunos from "../../hooks/alunos-hooks";

import Aluno from "./AlunoLine";
import AlunoForm from "./AlunoForm";

import {
  BsFillPersonPlusFill,
} from "react-icons/bs";

export default function AlunoList() {
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("list");
  const { alunos, adicionarAluno, atualizarAluno, removerAluno } = useAlunos(
    []
  );

  function editAluno(index) {
    setMode("edit");
    setCurrent(index);
  }
  const addAluno = () => {
    adicionarAluno();
    setMode("add");
    setCurrent(alunos.length);
  };
  const deleteAluno = index => {
    removerAluno(alunos[index]._id);
  };

  const saveChanges = aluno => {
    atualizarAluno(aluno, alunos[current]._id);
    setMode("list");
    setCurrent(current);
  };

  const cancelChanges = () => {
    console.log("Cancelar mudanças");
    if (mode === "add") {
      removerAluno(alunos.length - 1);
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
          <Col xl={8}>Alunos Cadastrados no Superlog</Col>
          <Col xl={4}>
            <BsFillPersonPlusFill onClick={addAluno} />
          </Col>
        </Row>
      )}
      <Row>
        {mode === "list" && (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matricula</th>
                <th>Entrada</th>
                <th>Responsável</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, i) => (
                <Aluno
                  key={`aluno__${i}`}
                  index={i}
                  aluno={aluno}
                  onDelete={index => {
                    deleteAluno(index);
                  }}
                  onEdit={index => {
                    editAluno(index);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}

        {(mode === "edit" || mode === "add") && (
          <AlunoForm
            aluno={alunos[current]}
            onUpdate={aluno => saveChanges(aluno)}
            onExit={() => cancelChanges()}
          />
        )}
      </Row>
    </Container>
  );
}
