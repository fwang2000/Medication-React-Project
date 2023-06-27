import { ICellRendererParams } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

const UpdateDOButtonCellRenderer = (props: ICellRendererParams) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/drip-orders/update/' + props.node.data.parameterguid, { state: { rowData: props.node.data } });
    }

    return (
        <input 
            type="button" 
            onClick={clickHandler}
            value="Update Drip Order Data"
        >
        </input>
    );
};

export default UpdateDOButtonCellRenderer;