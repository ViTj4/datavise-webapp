// import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { saveAs } from 'file-saver'
import Draggable from 'react-draggable'

import { ToolsBox } from './components/ToolsBox'

const Accueil = () => {
  // Exemple de données pour la première courbe
  // const courbeData1 = [
  //   { name: 'Janvier', y: 29 },
  //   { name: 'Février', y: 71 },
  //   { name: 'Mars', y: 106 },
  //   { name: 'Avril', y: 129 },
  //   { name: 'Mai', y: 144 },
  //   { name: 'Juin', y: 176 }
  // ]

  // Exemple de données pour la deuxième courbe
  // const courbeData2 = [
  //   { name: 'Janvier', y: 10 },
  //   { name: 'Février', y: 30 },
  //   { name: 'Mars', y: 50 },
  //   { name: 'Avril', y: 70 },
  //   { name: 'Mai', y: 90 },
  //   { name: 'Juin', y: 110 }
  // ]

  // Exemple de données pour le camembert
  const camembertData = [
    { name: 'Catégorie A', y: 45 },
    { name: 'Catégorie B', y: 25 },
    { name: 'Catégorie C', y: 30 }
  ]

  // Configuration pour le graphique avec deux courbes
  const courbeOptions = {
    title: {
      text: 'U.S Solar Employment Growth',
      align: 'left'
    },

    subtitle: {
      text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
      align: 'left'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [
      {
        name: 'Installation & Developers',
        data: [
          43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
          161454, 154610
        ]
      },
      {
        name: 'Manufacturing',
        data: [
          24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243,
          31050
        ]
      },
      {
        name: 'Sales & Distribution',
        data: [
          11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213,
          25663
        ]
      },
      {
        name: 'Operations & Maintenance',
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          11164,
          11218,
          10077
        ]
      },
      {
        name: 'Other',
        data: [
          21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
          10073
        ]
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  }

  // Fonction pour générer et télécharger le CSV à partir des données du graphique
  const downloadCSV = (seriesData, filename) => {
    const csvContent =
      `Year,${seriesData.map(series => series.name).join(',')}\n` +
      seriesData[0].data
        .map(
          (_, index) =>
            `${seriesData.map(series => series.data[index] || '').join(',')}`
        )
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, filename)
  }

  // Bouton pour télécharger le CSV de la première courbe
  const downloadCSVCourbe = () => {
    downloadCSV(courbeOptions.series, 'courbe.csv')
  }

  // Configuration pour le camembert
  const camembertOptions = {
    title: {
      text: 'Exemple de Camembert'
    },
    series: [
      {
        type: 'pie',
        data: camembertData
      }
    ]
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex' }}>
        <Draggable>
          <div style={{ flex: 1, marginRight: '10px', maxWidth: '550px' }}>
            <HighchartsReact highcharts={Highcharts} options={courbeOptions} />
            <button onClick={downloadCSVCourbe}>
              Télécharger CSV Courbe 1
            </button>
          </div>
        </Draggable>
        <Draggable>
          <div style={{ flex: 1, marginRight: '10px', maxWidth: '550px' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={camembertOptions}
            />
            {/* <button onClick={downloadCSVCamembert}>Télécharger CSV Camembert</button> */}
          </div>
        </Draggable>
        <Draggable>
          <div style={{ flex: 1, maxWidth: '550px' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={camembertOptions}
            />
            {/* <button onClick={downloadCSVCamembert}>Télécharger CSV Camembert</button> */}
          </div>
        </Draggable>
      </div>
      <ToolsBox />
    </div>
  )
}

export default Accueil
