import {
  BsFillTrashFill,
  BsFillEyeFill,
  BsPencil
} from "react-icons/bs";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Aluno({ aluno, index, onEdit, onDelete }) {
  return (
    <tr key={aluno._id} className="aluno">
      <td>{aluno.nome}</td>
      <td>{aluno.matricula}</td>
      <td>{aluno.data_entrada}</td>
      <td>{aluno.responsavel_nome}</td>
      <td>
        <Link to={`/aluno/${aluno._id}`}>
          <BsFillEyeFill />
        </Link>
        <BsPencil onClick={() => onEdit(index)} />
        <BsFillTrashFill onClick={() => onDelete(index)} />
      </td>
    </tr>
  );
}
