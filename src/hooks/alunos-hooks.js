import { useState } from "react";
import { useEffect } from "react";

export default function useAlunos(props) {
  const [alunos, setAlunos] = useState(props ? props : []);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/aluno`)
      .then(res => res.json())
      .then(
        result => {
          setAlunos(result);
        },
        error => {
          setAlunos([]);
        }
      );
  }, []);

  const recarregar = (ress) => {
    fetch(`${process.env.REACT_APP_API}/aluno`)
      .then(res => res.json())
      .then(
        result => {
          setAlunos(result);
        },
        error => {
          setAlunos([]);
        }
      );
  };

  const adicionarAluno = () => {
    const novoAluno = {
      matricula: "",
      nome: "",
      data_nascimento: "",
      responsavel_nome: "",
      contato_responsavel: "",
      turma: "",
      serie: "",
      cursos: []
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAluno)
    };

    fetch(
      `${process.env.REACT_APP_API}/aluno`,
      requestOptions
    )
      .then(res => recarregar(res));
  };
  const removerAluno = id => {
    fetch(
      `${process.env.REACT_APP_API}/aluno/${id}`,
      { method: "DELETE" }
    ).then(res => recarregar(res));
  };

  const atualizarAluno = (aluno, id) => {
    console.log("atualizar hooks")
    console.log(id)
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
        "Access-Control-Expose-Headers": "Content-Length,Content-Range" },
        body: JSON.stringify(aluno)
    };
    fetch(`${process.env.REACT_APP_API}/aluno/${id}`, requestOptions).then(() => recarregar());
  };

  return { alunos, adicionarAluno, atualizarAluno, removerAluno };
}
