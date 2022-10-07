import React from "react";


const DropDawfFilter = ({value,setSortTocart}) => {
return(
<select value={value} onChange={event => setSortTocart(event.target.value)} >
<option value=''>Выберите сортировку</option>
    <option>Цена по увелечению</option>
    <option>Цена по уменьшению</option>
</select>
)
}
export default DropDawfFilter