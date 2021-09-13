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

  const recarregar = ress => {
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
      titulo: "",
      autor: "",
      valor: 0,
      data_referencia: 0,
      categoria: ""
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoMaterial)
    };

    fetch(`${process.env.REACT_APP_API}/material`, requestOptions).then(res =>
      recarregar(res)
    );
  };
  const removerMaterial = id => {
    fetch(`${process.env.REACT_APP_API}/material/${id}`, {
      method: "DELETE"
    }).then(res => recarregar(res));
  };

  const atualizarMaterial = (material, id) => {
    const novoMaterial = {
      titulo: material.titulo?material.titulo:"",
      autor: material.autor?material.autor:0,
      valor: material.valor?material.valor:0,
      data_referencia:material.data_referencia?material.data_referencia:"",
      categoria: material.categoria?material.categoria:""
    };
    fetch(`${process.env.REACT_APP_API}/material/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(novoMaterial)
     
    })
      .then(response => {
        recarregar(response);
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return { materiais, adicionarMaterial, atualizarMaterial, removerMaterial };
}
