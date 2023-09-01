import PropTypes from 'prop-types';
import { useState } from 'react';

export const Filter = ({ onFilter }) => {
  const [filter, setFilter] = useState("");
  
  const handleFilter = e => {
    const inputValue = e.target.value
    if (inputValue !== '') {
    setFilter(inputValue)
    }
  }

  onFilter(filter)

    return (
      <label>
        Find contacts by name
        <input type="text" onChange={handleFilter} value={filter} />
      </label>
    );
}

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
  };