import React, { useState } from "react";
import { campoRequeridoValidacao } from "../validarForm";
import Input from "../Input";
import {  Button } from "react-bootstrap";


const validacao = {
  nome: campoRequeridoValidacao,
  matricula: campoRequeridoValidacao,
  data_nascimento: campoRequeridoValidacao,
  responsavel_nome: campoRequeridoValidacao,
  responsavel_contato: campoRequeridoValidacao
};

export default function AlunoForm({ aluno, onExit, onUpdate }) {
  const [al, setAl] = useState(aluno ? aluno : {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const cursos_lista = ["Concentração", "Memória", "Lógica"];
  

  function onChange(e) {
    const { name, value } = e.target;
    setAl({ ...al, [name]: value });
    setTouched({ ...touched, [name]: true });
    console.log("Mudou");
  }

  function onBlur(e) {
    const { name, value } = e.target;

    console.log("Apertou!");
    const { [name]: removedError, ...rest } = errors;
    const error = validacao[name] ? validacao[name](value) : null;
    const nameError = touched[name] ? error : null;

    setErrors({ ...rest, [name]: nameError });
  }

  function onSubmit(e) {
    e.preventDefault();
    const aluno_local = al;
    // percorre a questão validando todos os itens
    const validation = Object.keys(aluno_local).reduce((acc, key) => {
      const error = validacao[key] && validacao[key](aluno_local[key]);
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
      touchedValues.length === Object.values(aluno_local).length;
    const allTrue = touchedValues.every(t => t === true);

    // se isso ocorrer, então pode atualizaros dados
    if (errorsIsEmpty && touchedAll && allTrue) {
      onUpdate(aluno_local);
    }
  }

  function onCancel(e) {
    onExit();
  }

  const commonProps = {
    values: al,
    errors: errors,
    touched: touched,
    onChange: onChange,
    onBlur: onBlur
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Aluno</h2>
      <Input
        label="Nome"
        name="nome"
        placeholder="Digite o nome do aluno"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Matricula"
        name="matricula"
        placeholder="Digite a matricula do aluno"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Data de Nascimento"
        name="data_nascimento"
        type="date"
        placeholder="Digite a data de nascimento do aluno"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Nome do Responsavel"
        name="responsavel_nome"
        placeholder="Digite o nome do responsavel pelo aluno"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Contato do Responsavel"
        name="responsavel_contato"
        placeholder="Digite o contato do responsavel pelo aluno"
        isRequired={false}
        {...commonProps}
      />
      <Input
        label="Série/Ano"
        name="serie"
        placeholder="Digite o ano do aluno"
        isRequired={false}
        {...commonProps}
      />
      <Input
        label="Turma"
        name="turma"
        placeholder="Digite a turma do aluno"
        isRequired={false}
        {...commonProps}
      />
      <Input
        label="Data de Entrada"
        name="data_entrada"
        type="date"
        placeholder="Digite a data de Entrada do aluno"
        isRequired={false}
        {...commonProps}
      />
     

     <Button as="input" type="submit" value="Submit" />{' '}
      <Button onClick={onCancel} variant="danger">Cancelar</Button>
    </form>
  );
}

