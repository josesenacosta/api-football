import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../CampoSearch/CampoSearch.css';
const CampoSearch = () => {
  return (
    <>
      <input type="text" />
      <i>
        <AiOutlineSearch size={24} />
      </i>
    </>
  );
};

export default CampoSearch;
