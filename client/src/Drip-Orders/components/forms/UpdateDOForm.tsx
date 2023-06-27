import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateDOForm() {

    let location = useLocation();

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        dripname: location.state.rowData.dripname,
        intakedt: location.state.rowData.intakedt,
        dripvalue: location.state.rowData.dripvalue,
        dripuom: location.state.rowData.dripuom
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    }

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        fetch(`/drip-orders/${location.state.rowData.parameterguid}`, {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            parameterguid: location.state.rowData.parameterguid,
            ChartflowsheetGUID: location.state.rowData.ChartflowsheetGUID,
            dripname: form.dripname,
            intakedt: form.intakedt,
            dripvalue: form.dripvalue,
            dripuom: form.dripuom
          })
        }).then(async response => {

          const resJson = await response.json();

          if (!response.ok) {

            const error = (resJson && resJson.message) || response.status;
            return Promise.reject(error);

          } else {

            console.log("success: " + resJson.message);
            setMessage("successfully completed!");
          }

        }).catch(error => {

          console.log("There was an error: " + error);
          setMessage("there was an error");
        })
    }

    const handleClick = () => {

      navigate("/drip-orders/view");
    }

    return(
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Infusion: <textarea name="dripname" defaultValue={location.state.rowData.dripname} onChange={(e) => handleTextAreaChange(e)} required/>
          </label>
          <label>
            Last Recorded Time: 
            <input type="datetime-local" name="intakedt" defaultValue={location.state.rowData.intakedt} onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Drip Value: <input type="number" name="dripvalue" step={0.01} defaultValue={location.state.rowData.dripvalue} onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Drip UOM: <input type="text" name="dripuom" defaultValue={location.state.rowData.dripuom} onChange={(e) => handleInputChange(e)} required/>
          </label>
          <input type="submit" value="Update Drip Order"/>
        </form>
        <div>
          Update Status: { message }
        </div>
        <input type="button" name="return" value="Return to Drip Orders" onClick={handleClick}/>
      </div>
    )
}

export default UpdateDOForm;