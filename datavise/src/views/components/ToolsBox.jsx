import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

export const ToolsBox = ({ onCheckboxChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    camembert: false,
    scatterPlot: false,
    line: true,
  });

  ToolsBox.propTypes = { 
    onCheckboxChange: PropTypes.func.isRequired,
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxChangeLocal = (itemName) => {
    const newValue = !checkedItems[itemName];
    setCheckedItems({
      ...checkedItems,
      [itemName]: newValue,
    });

    // Informer le parent du changement
    onCheckboxChange(itemName, newValue);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faCog} style={{ marginRight: '5px' }} />
        Settings
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: isVisible ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease-in-out', // Ajout de l'effet de transition
          backgroundColor: 'white',
        }}
      >
        {isVisible && (
          <>
            <label>
              {' '}
              <input
                type='checkbox'
                checked={checkedItems.line}
                onChange={() => handleCheckboxChangeLocal('line')}
              />
              Line
            </label>
            <label>
              <input
                type='checkbox'
                checked={checkedItems.camembert}
                onChange={() => handleCheckboxChangeLocal('camembert')}
              />
              Camembert
            </label>
            <label>
              {' '}
              <input
                type='checkbox'
                checked={checkedItems.scatterPlot}
                onChange={() => handleCheckboxChangeLocal('scatterPlot')}
              />
              Scatter Plot
            </label>
          </>
        )}
      </div>
    </div>
  );
};
