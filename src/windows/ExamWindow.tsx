/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core"
import { Col, Row } from "../primitives/Flexbox"
import { Loading } from "../primitives/Loading"
import { Text } from "../primitives/Text"
import { Window } from "../primitives/Window"
import { setTo, State } from "../utils/state"
import Alert from "@material-ui/lab/Alert"
import Success from "@material-ui/icons/Done"
import { Exam } from "../utils/serialization"

export const ExamWindow = (
    props: {
       openWindow: State<boolean>
       exam: Exam
    }
) => {

    return(
      <Window
        open={props.openWindow}
      >
        
        <Col 
          width={700} 
          margin={{ left: 20 }} 
          padding={20}
        >

          <Col
            fill
          >
            <Text
                text={"Detalle del examen"}
                margin={{ bottom: 20 }}
                fontSize={25}
                style={{borderBottom: "2px solid lightgray"}}
            />
            <Col
                padding={20}
                fill
            >
                <Text text={`• Número de examen: ${props.exam.id}`} fontSize={20}/>
                <Text text={`• Nombre de examen: ${props.exam.title}`} fontSize={20}/>
                <Text text={`• Estado: ${props.exam.published ? "publicado" : "no publicado"}`} fontSize={20}/>
                <Text 
                    text={`• Preguntas: ${props.exam.questions.length === 0 ? "Actualmente no hay preguntas" : ""}`} 
                    fontSize={20}
                />
                {
                    props.exam.questions.map(it =>
                        <Text text={`Pregunta ${it.number}: ${it.text}`} fontSize={20} margin={{left: 50}}/>
                    )
                }
            </Col>
          </Col>
          <Row
            justifyChildren="spaceBetween"
            alignChildren={"center"}
            style={{borderTop: "2px solid lightgray"}}
          >
            <Button
              color="default"
              type="submit"
              style={{width: "30%", marginTop: 20}}
              variant="contained"
              onClick={setTo(props.openWindow, false)}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              type="submit"
              style={{width: "30%", marginTop: 20}}
              variant="contained"
              onClick={setTo(props.openWindow, false)}
            >
              Aceptar 
            </Button>
          </Row>

        </Col>
      </Window>
    )
}