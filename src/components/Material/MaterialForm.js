import React, { useState } from "react";
import { campoRequeridoValidacao } from "../validarForm";
import Input from "../Input";
import {  Button } from "react-bootstrap";


const validacao = {
  titulo:campoRequeridoValidacao,

  valor:campoRequeridoValidacao

};

export default function MaterialForm({material, onExit, onUpdate}) {
  const [mat, setMat] = useState(material?material:{});

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function onChange(e) {
    const { name, value } = e.target;
    setMat({ ...mat, [name]: value });
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
    const material_local = mat;
    // percorre a questão validando todos os itens
    const validation = Object.keys(material_local).reduce((acc, key) => {
      const error = validacao[key] && validacao[key](material_local[key]);
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
    const touchedAll = touchedValues.length === Object.values(material_local).length;
    const allTrue = touchedValues.every(t => t === true);

    // se isso ocorrer, então pode atualizaros dados
    if (errorsIsEmpty && touchedAll && allTrue) {
      onUpdate(material_local);
    }
  }
  
  function onCancel(e) {
    onExit();
  }


  const commonProps = {
    values: mat,
    errors: errors,
    touched: touched,
    onChange: onChange,
    onBlur: onBlur
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Material</h2>
      <Input
        label="Titulo"
        name="titulo"
        placeholder="Digite o titulo do material"
        isRequired={true}
        {...commonProps}
      />
       <Input
        label="Autor"
        name="autor"
        placeholder="Digite o autor do material"
        isRequired={false}
        {...commonProps}
      />
      <Input
        label="Valor"
        name="valor"
        type="number"
        placeholder="Digite o valor do material"
        isRequired={true}
        {...commonProps}
      />

      <Input
        label="Data de Lançamento"
        name="data_referencia"
        type="date"
        placeholder="Digite a data de referência do material"
        isRequired={false}
        {...commonProps}
      />
      <Input
        label="Categoria"
        name="categoria"
        placeholder="Digite da categoria do material"
        isRequired={false}
        {...commonProps}
      />

       
<Button as="input" type="submit" value="Submit" />{' '}
      <Button onClick={onCancel} variant="danger">Cancelar</Button>
    </form>
  );
}

