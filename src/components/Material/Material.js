import {
    BsFillTrashFill,
    BsFillPersonPlusFill,
    BsPencil
  } from "react-icons/bs";

export default function Material ({material, index, onEdit, onDelete}) {
  return (
    <tr key={material.id} className="material">
      <td>{material.titulo}</td>
      <td>{material.autor}</td>
      <td>{material.valor}</td>
      <td>{material.categoria}</td>
      <td>{material.data_referencia}</td>
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
