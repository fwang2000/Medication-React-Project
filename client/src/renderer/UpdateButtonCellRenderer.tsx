import { ICellRendererParams } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

const UpdateButtonCellRenderer = (props: ICellRendererParams) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('../medications/update/' + props.node.data.index, { state: { rowData: props.node.data } });
    }

    return (
        <input 
            type="button" 
            onClick={clickHandler}
            value="Update Row Data"
        >
        </input>
    );
};

export default UpdateButtonCellRenderer;