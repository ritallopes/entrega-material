import {
    BsFillTrashFill,
    BsFillPersonPlusFill,
    BsPencil
  } from "react-icons/bs";

export default function Aluno ({aluno, index, onEdit, onDelete}) {
  return (
    <tr key={aluno.id} className="aluno">
      <td>{aluno.nome}</td>
      <td>{aluno.matricula}</td>
      <td>{aluno.serie}</td>
      <td>{aluno.turma}</td>
      <td>{aluno.data_entrada}</td>
      <td>{aluno.responsavel_nome}</td>
      <td>{aluno.contato_responsavel}</td>
      <td>
        <BsPencil
          onClick={() => onEdit(index)}
        />
        <BsFillTrashFill
          onClick={() => onDelete(index)}
        />
      </td>
    </tr>
  );
};
