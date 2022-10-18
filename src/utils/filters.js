export const filtersPrice = (sortedArr,setFilteredArr,sortedDrop,sortMax,sortMin) =>{
    if (sortedDrop === sortMin) {
        const sorted = sortedArr
          .slice()
          .sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
          setFilteredArr(sorted);
      }
      if (sortedDrop === sortMax) {
        const sortedMin = sortedArr
          .slice()
          .sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1));
          setFilteredArr(sortedMin);
      }
}
export const seacrhed = (value,arr,setArr,paginatedArr) =>{
    if (value !== "") {
        const filtered = arr.filter((el) =>
          el.title.toLowerCase().includes(value.toLocaleLowerCase())
        );
        setArr(filtered);
      } else {
        setArr(arr);
        paginatedArr();
      }
}
export const filterData = (data) => {
  const arr = [];
  for (let key in data) {
    let obj = {
      emai: data[key].email,
      mesages: data[key].message,
      id: key,
    };
    arr.push(obj);
  }
  return arr;
};
export const paginatedFilter = (arr,totalCount) =>{
  const count = arr.length;
    const total = Math.ceil(count / 5);
    for (let i = 0; i < total; i++) {
      totalCount.push(i);
    }
}