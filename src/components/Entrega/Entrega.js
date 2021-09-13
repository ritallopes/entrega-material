import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import useMateriais from "../../hooks/materiais-hooks";
import useAlunos from "../../hooks/alunos-hooks";

export default function Material({ entrega, index, onEdit, onDelete }) {
  const { materiais } = useMateriais([]);
  const { alunos } = useAlunos([]);
  const aluno = alunos.filter((aluno) => {
      if( aluno._id == entrega.aluno_id){
          return true;
      }else{
          return false;
      }
  })[0];

  const reducer = (p, c)=> p+c;
  const valor_total = materiais.map((material) => material.valor).reduce(reducer);
  console.log(valor_total);

 
  return (
    <tr key={entrega.id} className="entrega">
      <td>{entrega.data}</td>
      <td>{aluno?aluno.nome:""}</td>
      <td>{aluno?aluno.responsavel_nome:""}</td>
      <td>{entrega.materiais_id[0]}</td>
      <td>{`${entrega.pagamento.parcela}x no ${entrega.pagamento.metodo}`}</td>
      <td>{valor_total?valor_total:0}</td>
      <td>
        <BsPencil onClick={() => onEdit(index)} />
        <BsFillTrashFill onClick={() => onDelete(index)} />
      </td>
    </tr>
  );
}
