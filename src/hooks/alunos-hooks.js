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

  const recarregar = ress => {
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

    fetch(`${process.env.REACT_APP_API}/aluno`, requestOptions).then(res =>
      recarregar(res)
    );
  };

  const removerAluno = id => {
    fetch(`${process.env.REACT_APP_API}/aluno/${id}`, {
      method: "DELETE"
    }).then(res => recarregar(res));
  };

  const atualizarAluno = (aluno, id) => {
    const novoAluno = {
      matricula: aluno.matricula?aluno.matricula:"",
      nome:aluno.nome?aluno.nome:"",
      data_nascimento: aluno.data_nascimento?aluno.data_nascimento:"",
      responsavel_nome: aluno.responsavel_nome?aluno.responsavel_nome:"",
      contato_responsavel: aluno.contato_responsavel?aluno.contato_responsavel:"",
      turma:aluno.turma?aluno.turma:"",
      serie: aluno.serie?aluno.serie:"",
      cursos: aluno.cursos?aluno.cursos:[]
    };

    fetch(`${process.env.REACT_APP_API}/aluno/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(novoAluno)
     
    })
      .then(response => {
        recarregar(response);
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };
  return { alunos, adicionarAluno, atualizarAluno, removerAluno };
}
