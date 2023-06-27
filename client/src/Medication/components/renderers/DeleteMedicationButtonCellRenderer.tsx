import { ICellRendererParams } from 'ag-grid-community';
import { MouseEvent } from 'react';

const DeleteMedicationButtonCellRenderer = (props: ICellRendererParams) => {

    const clickHandler = (e: MouseEvent<HTMLInputElement>) => {

        e.preventDefault();
        fetch(`/medications/${props.node.data.index}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'}
        }).then(async response => {

          const resJson = await response.json();

          if (!response.ok) {

            const error = (resJson && resJson.message) || response.status;
            return Promise.reject(error);

          } else {

            window.location.reload();
          }

        }).catch(error => {
            
            console.log("there was an error: " + error);
        })
    }

    return (
        <input 
            type="button" 
            onClick={clickHandler}
            value="Delete Medication"
        >
        </input>
    );
};

export default DeleteMedicationButtonCellRenderer;