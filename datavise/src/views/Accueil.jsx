import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { saveAs } from 'file-saver'
import Draggable from 'react-draggable'
import domtoimage from 'dom-to-image'

import { ToolsBox } from './components/ToolsBox'

const Accueil = () => {

  const [id, setId] = useState('courbe');
  const downloadPNG = async (containerId, filename) => {
    // Définir l'ID de manière asynchrone
    await setId(containerId);

    // Récupérer l'élément par l'ID après qu'il a été mis à jour
    const container = document.getElementById(id);

    // Continuer avec le reste de la logique
    domtoimage.toBlob(container).then(function (blob) {
      saveAs(blob, `${filename}.png`);
    });
  };

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
  // const downloadCSV = (seriesData, filename) => {
  //   const csvContent =
  //     `Year,${seriesData.map(series => series.name).join(',')}\n` +
  //     seriesData[0].data
  //       .map(
  //         (_, index) =>
  //           `${seriesData.map(series => series.data[index] || '').join(',')}`
  //       )
  //       .join('\n')

  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  //   saveAs(blob, filename)
  // }

  // // Bouton pour télécharger le CSV de la première courbe
  // const downloadCSVCourbe = () => {
  //   downloadCSV(courbeOptions.series, 'courbe.csv')
  // }

  // Exemple de données pour le camembert
  const scatterData = [
    { name: 'Catégorie A', y: 45 },
    { name: 'Catégorie B', y: 25 },
    { name: 'Catégorie C', y: 30 },
    { name: 'Catégorie D', y: 35 },
    { name: 'Catégorie E', y: 15 },
    { name: 'Catégorie F', y: 50 }
  ]

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

  const scatterOptions = {
    title: {
      text: 'Exemple de nuage de points'
    },
    series: [
      {
        type: 'scatter',
        data: scatterData
      }
    ]
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [showCourbe, setShowCourbe] = useState(true)
  const [showCamembert, setShowCamembert] = useState(false)
  const [showScatterPlot, setShowScatterPlot] = useState(false)

  const handleCheckboxChange = (itemName, value) => {
    if (itemName === 'camembert') {
      setShowCamembert(value)
    } else if (itemName === 'scatterPlot') {
      // Gérer la visibilité du graphique Scatter Plot
      setShowScatterPlot(value)
    } else if (itemName === 'line') {
      // Gérer la visibilité du graphique Line
      setShowCourbe(value)
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ToolsBox onCheckboxChange={handleCheckboxChange} />
      <div style={{ display: 'flex' }}>
        {showCourbe && (
          <Draggable
            bounds={{
              left: -windowSize.width + 100,
              top: -100,
              right: windowSize.width - 100,
              bottom: windowSize.height - 350
            }}
            onStart={() => console.log('Draggable started')}
            onStop={() => console.log('Draggable stopped')}
          >
            <div id='courbe' style={{ flex: 1, marginRight: '10px', maxWidth: '550px' }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={courbeOptions}
              />
              <button onClick={() => {setId('courbe');downloadPNG('courbe-container', 'courbe'); }}>
                Télécharger PNG Courbe 1
              </button>
            </div>
          </Draggable>
        )}

        {showCamembert && (
          <Draggable>
            <div id='camembert' style={{ flex: 1, marginRight: '10px', maxWidth: '550px' }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={camembertOptions}
              />
              <button
                onClick={() => {setId('camembert'); downloadPNG('camembert-container', 'camembert')}}
              >
                Télécharger PNG Camembert
              </button>
            </div>
          </Draggable>
        )}

        {showScatterPlot && (
          <Draggable>
            <div id='scatter' style={{ flex: 1, maxWidth: '550px' }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={scatterOptions}
              />
              <button
                onClick={() => {setId('scatter'); downloadPNG('scatter-container', 'scatter')}}
              >
                Télécharger PNG Scatter Plot
              </button>
            </div>
          </Draggable>
        )}
      </div>
    </div>
  )
}

export default Accueil
