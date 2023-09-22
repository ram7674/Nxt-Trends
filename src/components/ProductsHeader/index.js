import React from 'react'; // Import React
import { BsFilterRight } from 'react-icons/bs'; // Import the specific icon from react-icons/bs.......icons are different types like bs, fa, md 
import './index.css';

const ProductsHeader = (props) => {
  // Destructure props
  const { sortbyOptions, activeOptionId, updateActiveOptionId } = props;

  // Define the event handler
  const onChangeSortby = (event) => {
    updateActiveOptionId(event.target.value);
  };

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        {/* Use the imported icon */}
        <BsFilterRight className="sort-by-icon" />
        <h1 className="sort-by">Sort by</h1>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map((eachOption) => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
