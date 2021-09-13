import React, { useState } from "react";
import { campoRequeridoValidacao } from "../validarForm";
import Input from "../Input";
import useAlunos from "../../hooks/alunos-hooks";
import { Row, Col } from "react-bootstrap";
import useMaterial from "../../hooks/materiais-hooks";

const validacao = {
  titulo: campoRequeridoValidacao,
  valor: campoRequeridoValidacao
};

export default function EntregaForm({ entrega, onExit, onUpdate }) {
  const [ent, setMat] = useState(entrega ? entrega : {});
  const { alunos } = useAlunos([]);
  const { materiais } = useMaterial([]);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function onChange(e) {
    const { name, value } = e.target;
    setMat({ ...ent, [name]: value });
    setTouched({ ...touched, [name]: true });
  }

  function onBlur(e) {
    const { name, value } = e.target;

    const { [name]: removedError, ...rest } = errors;
    const error = validacao[name] ? validacao[name](value) : null;
    const nameError = touched[name] ? error : null;

    setErrors({ ...rest, [name]: nameError });
  }

  function onSubmit(e) {
    e.preventDefault();
    const entrega_local = ent;
    const validation = Object.keys(entrega_local).reduce((acc, key) => {
      const error = validacao[key] && validacao[key](entrega_local[key]);
      return {
        errors: {
          ...acc.errors,
          ...(error && { [key]: error })
        },
        touched: {
          ...acc.touched,
          ...{ [key]: true }
        }
      };
    }, {});

    setTouched(validation.touched);
    setErrors(validation.errors);

    const errorValues = Object.values(validation.errors);
    const touchedValues = Object.values(validation.touched);
    const errorsIsEmpty = errorValues.length === 0;
    const touchedAll =
      touchedValues.length === Object.values(entrega_local).length;
    const allTrue = touchedValues.every(t => t === true);
    if (errorsIsEmpty && touchedAll && allTrue) {
      onUpdate(entrega_local);
    }
  }

  function onCancel(e) {
    onExit();
  }

  const commonProps = {
    values: ent,
    errors: errors,
    touched: touched,
    onChange: onChange,
    onBlur: onBlur
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Entrega de Material</h2>
      <Row>
        {alunos.map(a => (
          <Col>
            <input
              type="radio"
              id="aluno_id"
              name="aluno_id"
              value={a._id}
              onChange={onBlur}
              onBlur={onChange}
              checked={ent.aluno_id == a._id}
            />
            <label for="aluno_id">{a.nome}</label>
          </Col>
        ))}
      </Row>
      <Row>
        {materiais.map((m, i) => (
          <Col>
            <input
              type="checkbox"
              Label={m.titulo}
              values={m._id}
              name={"materiais_id"}
              onChange={onBlur}
              onBlur={onChange}
              value={m._id}
              checked={ent.materiais_id.includes(m._id)}
            />
            <label for="materiais_id">{m.titulo}</label>
          </Col>
        ))}
      </Row>

      <Input
        label="Data"
        name="data"
        type="date"
        placeholder="Digite a data da entrega"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Forma de Pagamento"
        name="pagamento_metodo"
        placeholder="Digite a forma de pagamento"
        isRequired={true}
        {...commonProps}
      />

      <Input
        label="Parcelamento"
        name="pagamento_parcela"
        type="number"
        placeholder="Digite a quantidade de parcelas"
        isRequired={false}
        {...commonProps}
      />

      <input type="submit" value="Salvar" />
      <button onClick={onCancel}>Cancelar</button>
    </form>
  );
}
