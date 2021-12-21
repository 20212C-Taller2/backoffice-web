import React, { useEffect } from "react"
import { Col, Row } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"
import Check from "@material-ui/icons/CheckCircle"
import { useAdminUser } from "../hooks/context"
import { useNavigation } from "../hooks/navigation"
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

const options = (graphicType: "pie" | "bars") => ({
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
      display: false,
      text: 'Metricas',
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
  const runGetMetricsAsync = getMetricsAsync.run({
    credentials: adminUser.credentials, 
    startDate: formatDate(startDate.value),
    endDate: formatDate(endDate.value)
  })
  
  useEffect(runGetMetricsAsync, [adminUser.credentials])
console.log(graphicType.value)
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
                  onClick={runGetMetricsAsync}
                >
                <Text fill text={"Visualizar Métricas"}/>
              </Button>
              </Row>  
              <Row
                margin={ graphicType.value === "bars" ? {top: 50} : { left: "25%"}}
                width={graphicType.value === "bars" ? undefined : "50%"}
              >
                { 
                  graphicType.value === "bars" ?
                    <Bar options={options("bars")} data={formatData(getMetricsAsync.result)} /> :
                    <Pie options={options("pie")} data={formatData(getMetricsAsync.result)} />
                }
              </Row>
            </> :
            <LoadingPage/>
      }
    </Col>
  )
}
