import React, { useEffect } from "react"
import { Col, Row } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"
import { useAdminUser } from "../hooks/context"
import { useAsynchronous } from "../utils/asynchronism"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import { MetricList, MetricType } from "../utils/serialization"
import { LoadingPage } from "../primitives/Loading"
import { enumMatch } from "../utils/pattern-matching"
import { DateEditor } from "../primitives/DateEditor"
import { setTo, useStatefull } from "../utils/state"
import { LocalDate, DateTimeFormatter } from "js-joda"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import Sad from "@material-ui/icons/SentimentDissatisfied"
import { Frame } from "../primitives/Frame"

const formatDate = (date: LocalDate | undefined) => 
  date === undefined ? undefined :
  DateTimeFormatter.ISO_LOCAL_DATE.format(date)

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const options = (graphicType: "pie" | "bars", startDate?: string, endDate?: string) => ({
  indexAxis: graphicType === "bars" ? 'y' as const : undefined,
  elements: {
    bar: {
      borderWidth: 3,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
      display: graphicType === "bars" ? false : true,
    },
    title: {
      display: true,
      text: 
        startDate === undefined && endDate === undefined ? 
          'Metricas de hoy' :
          (startDate === endDate) || startDate === undefined || endDate === undefined ?
            `Métricas del día ${startDate ?? endDate}` :
            `Métricas desde el día ${startDate} hasta el día ${endDate}`
    },
  }
})

const formatOperation = (operation: MetricType) => enumMatch(operation)({
  "user-blocked": "Usuarios bloqueados",
  "user-unblocked": "Usuarios desbloqueados",
  "user-federated-login": "Logueos con Google",
  "user-federated-register": "Cuentas nuevas con Google",
  "user-login": "Logueos",
  "user-register": "Cuentas nuevas",
})

const getColors = (quantityOfMetrics: number, alpha: number) => [
  `rgba(255, 99, 132, ${alpha})`,
  `rgba(54, 162, 235, ${alpha})`,
  `rgba(255, 206, 86, ${alpha})`,
  `rgba(75, 192, 75, ${alpha})`,
  `rgba(153, 102, 255, ${alpha})`,
  `rgba(255, 89, 40, ${alpha})`,
].slice(0, quantityOfMetrics)

const formatData = (metricsList: MetricList) => {
  const metrics = metricsList.metrics
  const metricLabels = metrics.map(it => formatOperation(it.operation))
  const valuesQuantity = metrics.map(it => it.count)

  return(
    {
      labels: metricLabels,
      datasets: [
        {
          label: 'Metricas Ubdademy',
          data: valuesQuantity,
          borderColor: getColors(metricLabels.length, 1),
          backgroundColor: getColors(metricLabels.length, 0.2)
        },
      ]
    }
  )
}

export const MetricsPage = () => {

  const adminUser = useAdminUser()
  const startDate = useStatefull<LocalDate | undefined>(() => undefined)
  const endDate = useStatefull<LocalDate | undefined>(() => undefined)
  const graphicType = useStatefull<"bars" | "pie">(() => "bars")
  const openSelect = useStatefull(() => false)

  const getMetricsAsync = useAsynchronous(adminUser.actions.getMetrics)
  const runGetMetricsAsync = (startDate?: string, endDate?: string) => getMetricsAsync.run({
    credentials: adminUser.credentials, 
    startDate: startDate,
    endDate: endDate
  })
  
  useEffect(runGetMetricsAsync(), [adminUser.credentials.user.id])

  return (
    <Col 
      fill
      padding={40} 
    >
      <Text 
        text={"Métricas"}
        color="#444444"
        fontSize={26}
        bold
        margin={{bottom: 20}}
        style={{ borderBottom: "2px solid lightgray" }}
      />
        {
          getMetricsAsync.result !== undefined && getMetricsAsync.status === "completed"?
            <>
              <Row
                justifyChildren="spaceEvenly"
                alignChildren="center"
                margin={{top: 20}}
              >
                <DateEditor
                  label={"Fecha desde"}
                  state={startDate}
                  style={{ width: "20%" }}
                  max={ LocalDate.now()}
                />
                <DateEditor
                  label={"Fecha hasta"}
                  state={endDate}
                  max={ LocalDate.now()}
                  style={{ width: "20%" }}
                />
                <FormControl
                  style={{width: "15%"}}
                >
                  <InputLabel id="graphic-type" children={"Tipo de gráfico"}/>
                  <Select
                    label={"Tipo de gráfico"}
                    id="graphic-type"
                    inputProps={{placeholder: "sda"}}
                    open={openSelect.value}
                    onClose={setTo(openSelect, false)}
                    onOpen={setTo(openSelect, true)}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => 
                      setTo(graphicType, event.target.value as ("bars" | "pie"))()
                    }
                  >
                    <MenuItem value={"bars"} children={"Barras"}/>
                    <MenuItem value={"pie"} children={"Torta"}/>
                  </Select>
                </FormControl>
                <Button
                  color="primary"
                  type="submit"
                  style={{width: "20%"}}
                  variant="contained"
                  onClick={runGetMetricsAsync(formatDate(startDate.value), formatDate(endDate.value))}
                >
                  <Text fill text={"Visualizar Métricas"}/>
                </Button>
              </Row>
              
              {
                getMetricsAsync.result.metrics.length !== 0 ?
                  <Col
                    margin={{top: 100}}
                    width={graphicType.value === "bars" ? "65%" : "40%"}
                    centerInParent
                  >
                    { 
                      graphicType.value === "bars" ?
                        <Bar 
                          options={options("bars", startDate.value?.toString(), endDate.value?.toString())} 
                          data={formatData(getMetricsAsync.result)} 
                          
                        /> :
                        <Pie 
                          options={options("pie", startDate.value?.toString(), endDate.value?.toString())} 
                          data={formatData(getMetricsAsync.result)} 
                          
                        />
                    }
                  </Col> :
                  <Col alignChildren="center" margin={{top: 100}}>
                    <Sad style={{fontSize: 60, color: "#444444"}}/>
                    <Text 
                      text={"No hubo actividad durante el período seleccionado"} 
                      margin={{top:20}} 
                      bold 
                      fontSize={20}
                      color="#444444"
                    />
                    <Text 
                      text={"Por favor, intentelo con otras fechas"} 
                      margin={{top:20}} 
                      bold 
                      fontSize={20}
                      color="#444444"
                    />
                  </Col>
                }
            </> :
            <LoadingPage/>
      }
    </Col>
   
  )
}
