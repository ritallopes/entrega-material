import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function AlunoProfile () {
    const { id } = useParams();
    const [aluno, setAlunos] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/aluno/${id}`)
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

    return(
        <Container>
             <Row> <h4>{aluno?aluno.nome:""}</h4><hr/></Row>
            <Row>
                <Col xl={3}><strong>Matricula: </strong></Col>
                <Col xl={9}> {aluno?aluno.matricula:""}</Col>
            </Row>
            
            <Row>
                <Col xl={3}><strong>Ano: </strong></Col>
                <Col xl={9}> {aluno?aluno.serie:""}</Col>
            </Row>
            <Row>
                <Col xl={3}><strong>Turma: </strong></Col>
                <Col xl={9}> {aluno?aluno.turma:""}</Col>
            </Row>
            <Row>
                <Col xl={3}><strong>Data de Nascimento: </strong></Col>
                <Col xl={9}> {aluno?aluno.data_nascimento:""}</Col>
            </Row>

            <br/>
            <Row> <h5>Responsavel</h5></Row>
            <Row>
                <Col xl={3}><strong>Responsavel: </strong></Col>
                <Col xl={9}> {aluno?aluno.responsavel_nome:""}</Col>
            </Row>
            <Row>
                <Col xl={3}><strong>Contato: </strong></Col>
                <Col xl={9}> {aluno?aluno.responsavel_contato:""}</Col>
            </Row>

            <br/>
            <Row> <h5>Superlog</h5></Row>
            <Row>
                <Col xl={3}><strong>Data de Cadastro: </strong></Col>
                <Col xl={9}> {aluno?aluno.data_entrada:""}</Col>
            </Row>
            <Row>
                
            </Row>
           
       
        </Container>

    )


}