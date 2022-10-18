import { useState } from "react";
export const usePaginate = (array,setRezervArray) =>{
const [currentPage, setCurrentPage] = useState(1);
const [tocarPerPage] = useState(5);
const totalPageCount = [];


const watchPaginated = async () => {
  const lastIndex = currentPage * tocarPerPage;
  const firsIndex = lastIndex - tocarPerPage;
  const paginatedArr = await array.slice(firsIndex, lastIndex);
  setRezervArray(paginatedArr);
};

const paginations = (page) => {
  setCurrentPage(page);
};
return{watchPaginated,paginations,totalPageCount,currentPage}
}