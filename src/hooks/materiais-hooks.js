import { useState } from "react";
import { useEffect } from "react";

export default function useMaterial(props) {
  const [materiais, setMaterial] = useState(props ? props : []);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/material`)
      .then(res => res.json())
      .then(
        result => {
          setMaterial(result);
        },
        error => {
          setMaterial([]);
        }
      );
  }, []);

  const recarregar = (ress) => {
    fetch(`${process.env.REACT_APP_API}/material`)
      .then(res => res.json())
      .then(
        result => {
          setMaterial(result);
        },
        error => {
          setMaterial([]);
        }
      );
  };

  const adicionarMaterial = () => {
    const novoMaterial = {
      titulo:"",
      autor:"",
      valor:0,
      data_referencia:0,
      categoria:""
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoMaterial)
    };

    fetch(
      `${process.env.REACT_APP_API}/material`,
      requestOptions
    )
      .then(res => res.json())
      .then(
        result => {
          setMaterial(result);
        },
        error => {
          setError(error);
        }
      );
  };
  const removerMaterial = id => {
    fetch(
      `${process.env.REACT_APP_API}/material/${id}`,
      { method: "DELETE" }
    ).then(res => recarregar(res));
  };

  const atualizarMaterial = (material, id) => {
    console.log("atualizar hooks")
    console.log(id)
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
        'Access-Control-Expose-Headers': 'Content-Length,Content-Range' },
        body: JSON.stringify(material)
    };
    fetch(`${process.env.REACT_APP_API}/material/${id}`, requestOptions).then(() => recarregar());
  };

  return { materiais, adicionarMaterial, atualizarMaterial, removerMaterial };
}
