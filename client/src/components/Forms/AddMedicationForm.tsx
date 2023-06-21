import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddMedicationForm() {

    let location = useLocation();

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        name: "",
        category: "",
        pending: false,
        lastadm: "",
        lastdose: "",
        route: "",
        frequency: "",
        dose: "",
        isprn: false,
        issuspended: false,
        summaryline: ""
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
        fetch("/medications", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: form.name,
            category: form.category,
            lastadm: form.pending ? "Pending" : form.lastadm,
            lastdose: form.pending ? "" : form.lastdose,
            route: form.route,
            frequency: form.frequency,
            dose: form.dose,
            isprn: form.isprn,
            issuspended: form.issuspended,
            summaryline: form.summaryline
          })
        }).then(async response => {

            console.log("send request");
            console.log(response);
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
            Medication Name: <input type="text" name="name" onChange={(e) => handleInputChange(e)} required/>
          </label>
          <label>
            Category: <input type="text" name="category" onChange={(e) => handleInputChange(e)}/>
          </label>
          <label>
            Pending?
            <input type="checkbox" name="pending" defaultChecked={form.pending} onChange={(e) => handleInputChange(e)}/>
          </label>
          <fieldset disabled={form.pending}>
            <legend>Last Administered</legend>
            <label>
              Administered Date: 
              <input type="datetime-local" name="lastadm" onChange={(e) => handleInputChange(e)} required/>
            </label>
            <label>Last Dosage
              <input type="text" name="lastdose" onChange={(e) => handleInputChange(e)} required/>
            </label>
          </fieldset>
          <fieldset>
            <legend>Current Dosage</legend>
            <label>
              Route: 
              <input type="text" name="route" onChange={(e) => handleInputChange(e)}/>
            </label>
            <label>
              Frequency: 
              <input type="text" name="frequency" onChange={(e) => handleInputChange(e)}/>
            </label>
            <label>Dosage:
              <input type="text" name="dosage" onChange={(e) => handleInputChange(e)}/>
            </label>
          </fieldset>
          <label>
            PRN?
            <input type="checkbox" name="isprn" defaultChecked={form.isprn} onChange={(e) => handleInputChange(e)}/>
          </label>
          <label>
            Suspended?
            <input type="checkbox" name="issuspended" defaultChecked={form.issuspended} onChange={(e) => handleInputChange(e)}/>
          </label>
          <br></br>
          <label>
            Summary
            <textarea name="summaryline" rows={5} cols={60} onChange={(e) => handleTextAreaChange(e)}/>
          </label>
          <input type="submit" value="Add Medication"/>
        </form>
        <div>
          Add Status: { message }
        </div>
        <input type="button" name="return" value="Return to Medications" onClick={handleClick}/>
      </div>
    )
}

export default AddMedicationForm;