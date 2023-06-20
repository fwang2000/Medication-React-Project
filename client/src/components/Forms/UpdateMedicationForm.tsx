import { Console } from "console";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateMedicationForm() {

    let location = useLocation();

    const pendingString = "Pending";

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        name: location.state.rowData.name,
        category: location.state.rowData.category,
        pending: location.state.rowData.lastadm === pendingString,
        lastadm: location.state.rowData.lastadm,
        lastdose: location.state.rowData.lastdose,
        route: location.state.rowData.route,
        frequency: location.state.rowData.frequency,
        dose: location.state.rowData.dose,
        isprn: location.state.rowData.isprn,
        summaryline: location.state.rowData.summaryline
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.type === "checkbox") {

          setForm({
            ...form,
            [event.target.name]: event.target.checked
          });

        } else if (event.target.type === "text" || event.target.type === "datetime-local") {

          setForm({
            ...form,
            [event.target.name]: event.target.value
          });
        }
    }

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();
        fetch(`/medications/${location.state.rowData.index}`, {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            index: location.state.rowData.index,
            name: form.name,
            category: form.category,
            lastadm: form.pending ? pendingString : form.lastadm,
            lastdose: form.pending ? "" : form.lastdose,
            route: form.route,
            frequency: form.frequency,
            dose: form.dose,
            isprn: form.isprn,
            summaryline: form.summaryline
          })
        }).then(async response => {

          const resJson = await response.json();

          if (!response.ok) {

            const error = (resJson && resJson.message) || response.status;
            return Promise.reject(error);

          } else {

            console.log("success");
            setMessage("successfully completed!");
          }

        }).catch(error => {

          console.log("There was an error: " + error);
          setMessage("there was an error");
        })
    }

    const handleClick = () => {

      navigate("../../medications");
    }

    return(
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Medication Name: <input type="text" name="name" defaultValue={location.state.rowData.name} onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Category: <input type="text" name="category" defaultValue={location.state.rowData.category} onChange={(e) => handleInputChange(e)}/>
          </label>
          <label>
            Pending?
            <input type="checkbox" name="pending" defaultChecked={form.pending} onChange={(e) => handleInputChange(e)}/>
          </label>
          <fieldset disabled={form.pending}>
            <legend>Last Administered</legend>
            <label>
              Administered Date: 
              <input type="datetime-local" name="lastadm" defaultValue={location.state.rowData.lastadm} onChange={(e) => handleInputChange(e)} required/>
            </label>
            <label>Last Dosage
              <input type="text" name="lastdose" min={0} defaultValue={location.state.rowData.lastdose} onChange={(e) => handleInputChange(e)} required/>
            </label>
          </fieldset>
          <fieldset>
            <legend>Current Dosage</legend>
            <label>
              Route: 
              <input type="text" name="route" defaultValue={location.state.rowData.route} onChange={(e) => handleInputChange(e)}/>
            </label>
            <label>
              Frequency: 
              <input type="text" name="frequency" defaultValue={location.state.rowData.frequency} onChange={(e) => handleInputChange(e)}/>
            </label>
            <label>Dosage:
              <input type="text" name="dosage" defaultValue={location.state.rowData.dose} onChange={(e) => handleInputChange(e)}/>
            </label>
          </fieldset>
          <label>
            PRN?
            <input type="checkbox" name="isprn" defaultChecked={location.state.rowData.isprn} onChange={(e) => handleInputChange(e)}/>
          </label>
          <br></br>
          <label>
            Summary
            <textarea name="summaryline" rows={5} cols={60} defaultValue={location.state.rowData.summaryline} onChange={(e) => handleTextAreaChange(e)}/>
          </label>
          <input type="submit" value="Update Medication"/>
        </form>
        <div>
          Update Status: { message }
        </div>
        <input type="button" name="return" value="Return to Medications" onClick={handleClick}/>
      </div>
    )
}

export default UpdateMedicationForm;