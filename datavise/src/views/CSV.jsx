import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Button, Table, Input, Dropdown } from 'semantic-ui-react';
import { UilArrowLeft, UilArrowRight, UilTrashAlt, UilExport } from '@iconscout/react-unicons';
import ModalChoice from './components/ModalChoice';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import { useNavigate } from 'react-router-dom';

function CSV() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedColumn, setSelectedColumn] = useState(data.length > 0 ? Object.keys(data[0])[0] : '');
  const [selectedColumn2, setSelectedColumn2] = useState(data.length > 0 ? Object.keys(data[0])[0] : '');

  useEffect(() => {
    if (data.length > 0) {
      const visibility = Object.keys(data[0]).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setColumnVisibility(visibility);
    }
  }, [data]);

  const handleColumnVisibilityChange = (e, { value }) => {
    const newVisibility = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key] = value.includes(key);
      return acc;
    }, {});
    setColumnVisibility(newVisibility);
  };
  

  const columnOptions = data.length > 0
  ? Object.keys(data[0]).map(columnName => ({
      key: columnName,
      text: columnName,
      value: columnName,
    }))
  : [];


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length === 0) {
      setFilteredData(data);
    } else {
      const searchTermLower = value.toLowerCase();
      const filtered = data.filter(row => 
        Object.values(row).some(
          cellValue => cellValue.toString().toLowerCase().includes(searchTermLower)
        )
      );
  
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
          setIsModalOpen(true);
          setFilteredData(result.data);
          setSelectedColumn(Object.keys(result.data[0])[0]);
          setSelectedColumn2(Object.keys(result.data[0])[0]);

          e.target.value = '';
          setSearchTerm(e.target.value);
        },
        header: true,
        skipEmptyLines: true
      });
    }
  };

  const prepareChartData = (xColumn, yColumn) => {
    return data.map(item => [Number(item[xColumn]), Number(item[yColumn])]);
  };

  const handleEdit = (rowIndex, col, value) => {
    const realIndex = searchTerm ? data.findIndex(row => row === filteredData[rowIndex]) : rowIndex;
    const newData = [...data];
    newData[realIndex][col] = value;
    setData(newData);
    
    if (searchTerm) {
      const newFilteredData = [...filteredData];
      newFilteredData[rowIndex][col] = value;
      setFilteredData(newFilteredData);
    }
  };

  const handleDelete = (rowIndex) => {
    const realIndex = searchTerm ? data.findIndex(row => row === filteredData[rowIndex]) : rowIndex;
    const newData = data.filter((_, index) => index !== realIndex);
    setData(newData);
  
    if (searchTerm) {
      const newFilteredData = filteredData.filter((_, index) => index !== rowIndex);
      setFilteredData(newFilteredData);
    }
  };
  

  const handleExport = () => {
    const filteredDataForExport = data.map(row => {
      const filteredRow = {};
      Object.entries(row).forEach(([key, value]) => {
        if (columnVisibility[key]) {
          filteredRow[key] = value;
        }
      });
      return filteredRow;
    });
  
    const csv = Papa.unparse(filteredDataForExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setCsvLoaded(true);
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = searchTerm ? Math.ceil(filteredData.length / rowsPerPage) : Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* File Import Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
      </div>
  
      {csvLoaded && (
        <>
          {/* Dropdowns for Highcharts Column Selection */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <label>Select Y Axis: </label>
            <select onChange={e => setSelectedColumn(e.target.value)} value={selectedColumn}>
              {Object.keys(data[0]).map(columnName => (
                <option key={columnName} value={columnName}>{columnName}</option>
              ))}
            </select>
  
            <label>Select X Axis: </label>
            <select onChange={e => setSelectedColumn2(e.target.value)} value={selectedColumn2}>
              {Object.keys(data[0]).map(columnName => (
                <option key={columnName} value={columnName}>{columnName}</option>
              ))}
            </select>
          </div>
  
          {/* Highcharts Graph */}
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: `Graph for ${selectedColumn} and ${selectedColumn2}`
                },
                xAxis: {
                  title: {
                    text: selectedColumn2
                  }
                },
                yAxis: {
                  title: {
                    text: selectedColumn
                  }
                },
                series: [
                  {
                    type: 'line',
                    data: prepareChartData(selectedColumn2, selectedColumn)
                  }
                ]
              }}
            />
          </div>
  
          {/* Export and Continue Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <Button onClick={handleExport} style={{ borderRadius: '50%', backgroundColor: 'emerald' }}>
              <UilExport />
            </Button>
            <Button onClick={() => alert('To be Continued')} style={{ borderRadius: '50%', backgroundColor: 'emerald' }}>
              <UilArrowRight />
            </Button>
          </div>
  
          {/* Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Input icon='search' placeholder='Rechercher...' onChange={handleSearchChange} value={searchTerm} />
          </div>
  
          {/* Column Visibility Dropdown */}
          {data.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Dropdown
                placeholder='Sélectionnez les colonnes'
                fluid
                multiple
                selection
                options={columnOptions}
                onChange={handleColumnVisibilityChange}
                value={Object.keys(columnVisibility).filter(key => columnVisibility[key])}
              />
            </div>
          )}

        {/* Tableau */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{ 
            display: 'inline-flex',
            flexDirection: 'column',
            width: '90%',
            overflowX: 'auto',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
            backgroundColor: '#fff',           
          }}>
            <Table striped style={{
              textAlign: 'center', 
              borderCollapse: 'collapse',
              minWidth: '600px',
            }}>
            <Table.Header className="ui inverted dark blue table" style={{ color: 'black' }}>
              <Table.Row>
                {data[0] && Object.keys(data[0]).map((header) => (
                  columnVisibility[header] && (
                    <Table.HeaderCell key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {header}
                    </Table.HeaderCell>
                  )
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentRows.map((row, rowIndex) => (
                <Table.Row key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  {Object.entries(row).map(([col, value], colIndex) => (
                    columnVisibility[col] && (
                      <Table.Cell key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <input value={value} onChange={(e) => handleEdit(rowIndex, col, e.target.value)} style={{ textAlign: 'center', border: 'none', backgroundColor: 'transparent' }} />
                      </Table.Cell>
                    )
                  ))}
                  <Table.Cell style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <Button onClick={() => handleDelete(rowIndex)} style={{ borderRadius: '50%', backgroundColor: 'red', color: 'white' }}>
                      <UilTrashAlt />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            </Table>    
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '5px' }}>
            {/* Bouton précédent */}
            <Button
              circular
              icon
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '10px',
                cursor: 'pointer'
                }}
            >
              <UilArrowLeft />
            </Button>

            {/* Premières pages */}
            {currentPage > 4 && (
              <>
                {Array.from({ length: 2 }, (_, index) => (
                    <Button
                      key={index}
                      circular
                      primary={currentPage === index + 1}
                      onClick={() => paginate(index + 1)}
                      style={{
                        backgroundColor: currentPage === index + 1 ? '#007bff' : '#f0f0f0',
                        color: currentPage === index + 1 ? 'white' : 'black',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      {index + 1}
                    </Button>
                ))}
                  <Button
                    circular
                    primary={currentPage === totalPages }
                    style={{
                      backgroundColor:  '#f0f0f0',
                      color:  'black',
                      border: '1px solid #ccc',
                      borderRadius: '10px'
                    }}
                  >
                    ...
                  </Button>
              </>
            )}

            {/* Pages autour de la page actuelle */}
            {Array.from({ length: 5 }, (_, index) => {
              const page = currentPage - 2 + index;
              return (page > 0 && page <= totalPages) && (
              <Button
                key={page}
                circular
                primary={currentPage === page}
                onClick={() => paginate(page)}
                style={{
                  backgroundColor: currentPage === page ? '#007bff' : '#f0f0f0',
                  color: currentPage === page ? 'white' : 'black',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                {page}
              </Button>
              );
            })}

            {/* Ellipse et dernière page si nécessaire */}
            {currentPage < totalPages - 3 && (
              <>
                <Button
                  circular
                  primary={currentPage === totalPages }
                  style={{
                    backgroundColor: '#f0f0f0',
                    color:  'black',
                    border: '1px solid #ccc',
                    borderRadius: '10px'
                  }}
                >
                  ...
                </Button>

                <Button
                  circular
                  primary={currentPage === totalPages}
                  onClick={() => paginate(totalPages)}
                  style={{ 
                    backgroundColor: currentPage === totalPages ? '#007bff' : '#f0f0f0',
                    color: currentPage === totalPages ? 'white' : 'black',
                    border: '1px solid #ccc', 
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >{totalPages}
                </Button>
              </>
            )}

            {/* Bouton suivant */}
            <Button
              circular
              icon
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              <UilArrowRight />
            </Button>
          </div>
        )}
      </>
      )}
      {/* Modal */}
      <ModalChoice open={isModalOpen} onClose={() => closeModal()} />
    </div>
  );
}

export default CSV;
