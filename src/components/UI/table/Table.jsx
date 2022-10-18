import React from "react";
import cl from './Table.module.css'


const Table = ({arrayTbody,arrayThead}) =>{
    
    return(
        <div>
        <table className={cl.table}>
	<thead>
        <tr>
    {arrayThead.map((el)=>(
   
   <th key={el}>{el}</th>
   

    ))}
    </tr>
		
	</thead>
	<tbody>
              {arrayTbody.map((el)=>(
                <>
                <tr key={el.uid}>
                <td>{el.email}</td>
            
                </tr>
                </>
            ))} 
	</tbody>
</table>
</div>
    )

}
export default Table