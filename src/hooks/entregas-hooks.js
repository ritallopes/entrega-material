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
      titulo: "",
      autor: "",
      valor: 0,
      data_referencia: 0,
      categoria: ""
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
      titulo: entrega.titulo?entrega.titulo:"",
      autor: entrega.autor?entrega.autor:0,
      valor: entrega.valor?entrega.valor:0,
      data_referencia:entrega.data_referencia?entrega.data_referencia:"",
      categoria: entrega.categoria?entrega.categoria:""
    };
    fetch(`${process.env.REACT_APP_API}/entrega/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(novoEntrega)
     
    })
      .then(response => {
        recarregar(response);
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return { entregas, adicionarEntrega, atualizarEntrega, removerEntrega };
}
