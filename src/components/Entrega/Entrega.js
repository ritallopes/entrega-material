import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Material({ entrega, alunos, materiais, index, onEdit, onDelete }) {

  const aluno = alunos.filter(aluno => {
    if (aluno._id == entrega.aluno_id) {
      return true;
    } else {
      return false;
    }
  })[0];

  const materiais_entregues = materiais.filter(material => {
    if (entrega.materiais_id.includes(String(material._id))) {
      return true;
    } else {
      return false;
    }
  });

  const reducer = (p, c) => p + c;
  const valor_total = materiais
    .map(material => parseInt(material.valor))
    .reduce(reducer, 0);
  return (
    <tr key={entrega.id} className="entrega">
      <td>{entrega.data}</td>
      <td><Link to={`/aluno/${aluno?aluno._id:""}`}>{aluno ? aluno.nome : ""}</Link></td>
      <td>{aluno ? aluno.responsavel_nome : ""}</td>
      <td>{materiais_entregues && materiais_entregues.map(mat => {
        return (<p>{mat.titulo}<br/></p>)
      })}</td>
      <td>{`${entrega.pagamento_parcela?entrega.pagamento.parcela:"1"}x no ${entrega.pagamento?entrega.pagamento.metodo:""}`}</td>
      <td>{`R$ ${valor_total ? valor_total : 0}`}</td>
      <td>
        <BsPencil onClick={() => onEdit(index)} />
        <BsFillTrashFill onClick={() => onDelete(index)} />
      </td>
    </tr>
  );
}
