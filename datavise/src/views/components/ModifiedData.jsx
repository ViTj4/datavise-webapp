import Draggable from 'react-draggable'

const generateTestData = () => {

  // Générer des valeurs de test (vous pouvez remplacer cela par une logique plus complexe selon vos besoins)
  const testData = []
  for (let i = 1; i <= 10; i++) {
    testData.push({
      id: i,
      value: Math.floor(Math.random() * 100) // Valeurs aléatoires entre 0 et 100
    })
  }
  return testData
}

export const ModifiedData = () => {
      
  // Générer des données de test
  const testData = generateTestData()

  return (
    <Draggable
      bounds={{
        left: -window.innerWidth + 100,
        top: -100,
        right: window.innerWidth - 100,
        bottom: window.innerHeight - 350
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '5px',
          display: 'flex',
          flexDirection: 'row',
          left: window.innerWidth * 0.25,
          position: 'absolute'
        }}
      >
        <div style={{ padding: 20 }}>
          <h1>Valeurs modifiées</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  ID
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  Valeurs
                </th>
              </tr>
            </thead>
            <tbody>
              {testData.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.id}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: 20 }}>
          <h1>Valeurs non modifiées</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  ID
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  Valeurs
                </th>
              </tr>
            </thead>
            <tbody>
              {testData.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.id}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Draggable>
  )
}
