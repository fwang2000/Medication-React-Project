import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDOForm() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        ChartflowsheetGUID: "",
        dripname: "",
        intakedt: "",
        dripvalue: "",
        dripuom: ""
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
        fetch("/drip-orders", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            ChartflowsheetGUID: parseInt(form.ChartflowsheetGUID),
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

      navigate("/drip-orders");
    }

    return(
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Chart flowsheet GUID: <input type="number" name="ChartflowsheetGUID" onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Infusion: <textarea name="dripname" onChange={(e) => handleTextAreaChange(e)} required/>
          </label>
          <label>
            Last Recorded Time: 
            <input type="datetime-local" name="intakedt" onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Drip Value: <input type="number" name="dripvalue" step={0.01} onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Drip UOM: <input type="text" name="dripuom" onChange={(e) => handleInputChange(e)} required/>
          </label>
          <input type="submit" value="Add Drip Order"/>
        </form>
        <div>
          Update Status: { message }
        </div>
        <input type="button" name="return" value="Return to Drip Orders" onClick={handleClick}/>
      </div>
    )
}

export default AddDOForm;