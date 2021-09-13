import { useState } from "react";
import { useEffect } from "react";

export default function useEntrega(props) {
  const [entregas, setEntrega] = useState(props ? props : []);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/entrega`)
      .then(res => res.json())
      .then(
        result => {
          setEntrega(result);
        },
        error => {
          setEntrega([]);
        }
      );
  }, []);

  const recarregar = ress => {
    fetch(`${process.env.REACT_APP_API}/entrega`)
      .then(res => res.json())
      .then(
        result => {
          setEntrega(result);
        },
        error => {
          setEntrega([]);
        }
      );
  };

  const adicionarEntrega = () => {
    const novoEntrega = {
      data: "",
      materiais_id: [],
      pagamento_metodo: "",
      pagamento_parcela: 1,
      aluno_id: ""
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEntrega)
    };

    fetch(`${process.env.REACT_APP_API}/entrega`, requestOptions).then(res =>
      recarregar(res)
    );
  };
  const removerEntrega = id => {
    fetch(`${process.env.REACT_APP_API}/entrega/${id}`, {
      method: "DELETE"
    }).then(res => recarregar(res));
  };

  const atualizarEntrega = (entrega, id) => {
    const novoEntrega = {
      data: entrega.data ? entrega.data : "",
      materiais_id: entrega.materiais_id ? entrega.materiais_id : [],
      pagamento_metodo: entrega.pagamento_metodo
        ? entrega.pagamento_metodo
        : "",
      pagamento_parcela: entrega.pagamento_parcela
        ? entrega.pagamento_parcela
        : "",
      aluno_id: entrega.aluno_id ? entrega.aluno_id : ""
    };
    fetch(`${process.env.REACT_APP_API}/entrega/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoEntrega)
    })
      .then(response => {
        recarregar(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return { entregas, adicionarEntrega, atualizarEntrega, removerEntrega };
}
