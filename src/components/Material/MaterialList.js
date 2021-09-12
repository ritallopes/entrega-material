import { Container, Table, Row } from "react-bootstrap";
import { useState } from "react";
import useMateriais from "../../hooks/materiais-hooks";

import Material from "./Material";
import MaterialForm from "./MaterialForm";

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
    atualizarMaterial(material, materiais[current]._id);
    setMode("list");
    setCurrent(current);
  };

  const cancelChanges = () => {
    console.log("Cancelar mudanças");
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
        <Row className="title_page">Materiais Cadastrados no Superlog</Row>
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
