import { Container, Table, Row, Col } from "react-bootstrap";
import { useState } from "react";
import useMateriais from "../../hooks/materiais-hooks";

import Material from "./Material";
import MaterialForm from "./MaterialForm";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";

export default function MaterialList() {
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("list");
  const { materiais, adicionarMaterial, atualizarMaterial, removerMaterial } = useMateriais(
    []
  );

  function editMaterial(index) {
    setMode("edit");
    setCurrent(index);
  }
  const addMaterial = () => {
    adicionarMaterial();
    setMode("add");
    setCurrent(materiais.length);
  };
  const deleteMaterial = index => {
    removerMaterial(materiais[index]._id);
  };

  const saveChanges = material => {
    console.log(materiais);
    atualizarMaterial(material, materiais[current]._id);
    setMode("list");
    setCurrent(current);
  };

  const cancelChanges = () => {
    if (mode === "add") {
      removerMaterial(materiais.length - 1);
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
          <Col xl={8}>Materiais Cadastrados no Superlog</Col>
          <Col  xl={4}> <BsFillPlusCircleFill onClick={addMaterial}/></Col>
          </Row>
      )}
      <Row>
        {mode === "list" && (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data de lançamento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materiais.map((material, i) => (
                <Material
                  key={`material__${i}`}
                  index={i}
                  material={material}
                  onDelete={index => {
                    deleteMaterial(index);
                  }}
                  onEdit={index => {
                    editMaterial(index);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}

        {(mode === "edit" || mode === "add") && (
         <MaterialForm material={materiais[current]} onUpdate = {(material) => saveChanges(material)} onExit = {() => cancelChanges()} />
        )}
      </Row>
    </Container>
  );
}
