import FieldService from "./services/MockService";
import { useState } from "react";
import Button from "./components/Button";

const initial_values = {
  label: FieldService.getField().label,
  defaultValue: FieldService.getField().default,
  displayAlpha: FieldService.getField().displayAlpha,
  choices: FieldService.getField().choices,
  required: FieldService.getField().required
};

const values = {
  label: FieldService.getField().label,
  defaultValue: FieldService.getField().default,
  displayAlpha: FieldService.getField().displayAlpha,
  choices: FieldService.getField().choices,
  required: FieldService.getField().required
};


function App() {
  const [choices, setChoices] = useState(initial_values.choices);
  const [addChoiceValue, setAddChoiceValue] = useState('');
  const [label, setLabel] = useState(values.label);
  const [checked, setChecked] = useState(values.required);
  const [defaultValue, setDefaultValue] = useState(values.defaultValue);
  function removeChoice(choice) {
    setChoices(choices => choices.filter(ch => ch !==  choice));
  }
  function addChoice() {
    if (addChoiceValue.length === 0) {
      alert('Please enter a value');
    }
    else if (addChoiceValue.length > 40) {
      alert('Please enter the choice value with size less than 40 characters');
    }
    else {
      var duplicate = choices.filter(choice => choice.toLowerCase() === addChoiceValue.toLowerCase());
      if (duplicate.length > 0) {
        alert('Please enter a choice that is not present');
        return;
      }
      if (choices.length === 50) {
        alert('Max. 50 choices allowed');
        return;
      }
      setChoices(choices => [...choices, addChoiceValue].sort());
      setAddChoiceValue('');
    }
  }
  function handleLabelChange(event) {
    values.label = event.target.value;
    setLabel(values.label);
  }
  
  function handleDefaultValueChange(event) {
    values.defaultValue = event.target.value;
    setDefaultValue(values.defaultValue);
  }
  
  function handleRequiredChange(event) {
    values.required = event.target.value;
    setChecked(values.required);
  }

  function handleAddChoiceValueChange(event) {
    setAddChoiceValue(event.target.value);
    if (event.target.value !== '' && event.target.value !== null && event.target.value !== undefined && event.target.value.length > 40) {
      document.getElementById("span-try").innerHTML = event.target.value.substring(0, 40) + `<span class='text-danger'>` + event.target.value.substring(40, event.target.value.length) + `</span>`;
    } else {
      document.getElementById("span-try").innerHTML = event.target.value;
    }
  }

  function handleReset() {
    setAddChoiceValue('');
    setChoices(choices => []);
    setLabel('');
    setChecked(false);
    setDefaultValue('');
    values.defaultValue = '';
    values.displayAlpha = true;
    values.label = '';
    values.required = false;
  }
  
  function handleSave() {
    // console.log(values);
    if (values.label === null || values.label === undefined || values.label === '') {
      alert('Please fill the label');
    }
    else {
      if (values.defaultValue !== null && values.defaultValue !== undefined && values.defaultValue !== '') {
        var duplicate = choices.filter(choice => choice.toLowerCase() === values.defaultValue.toLowerCase());
        if (duplicate.length === 0) {
          setChoices(choices => [...choices, values.defaultValue].sort());
        }
      }
      FieldService.saveField(values);
    }
  }
  return (
    <div className="App h-100">
      <div className="container h-100 py-4">
        <div className="row border border-blue rounded all-form">
          <div className="col-12 bg-blue text-blue p-2">
            <b>Field Builder</b>
          </div>
          <div className="col-12 p-4 main-form">
            <table className="table table-borderless">
              <tbody>
                <tr className="align-middle">
                  <td>Label <sup className="text-danger">*</sup> </td>
                  <td>
                    <input type="text" className="form-control" value={label} onChange={handleLabelChange} />
                  </td>
                </tr>
                <tr className="align-middle">
                  <td>Type</td>
                  <td>
                    <div className="d-flex align-items-center">
                      Multi-select <input className="form-check-input ms-3 me-1" type="checkbox" defaultChecked={checked} value={checked} onChange={handleRequiredChange} id="flexCheckDefault" />
                      <label>
                        A value is required
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="align-middle">
                  <td>Default Value</td>
                  <td>
                    <input type="text" className="form-control" value={defaultValue} onChange={handleDefaultValueChange} />
                  </td>
                </tr>
                <tr className="align-middle">
                  <td>Choices</td>
                  <td>
                    <div className="p-3 border rounded">
                      {choices.map(choice => (
                        <div className="d-flex align-items-center" key={choice}>
                          <div className="pointer">
                            {choice}
                          </div>
                          <div className="ms-auto pointer text-danger" onClick={() => removeChoice(choice)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items my-2">
                      <div className="highlight">
                        <input type="text" className="form-control dummy" value={addChoiceValue} onChange={handleAddChoiceValueChange} ></input>
                        <span className="extravalues" id="span-try"></span>
                      </div>
                      <Button className="btn btn-sm btn-success ms-2 save-btn" callBack={addChoice} label="Add"></Button>
                      {/* <button className="btn btn-sm btn-success ms-2 save-btn" onClick={addChoice}>Add</button> */}
                    </div>
                  </td>
                </tr>
                <tr className="align-middle">
                  <td>Order</td>
                  <td>
                  <select className="form-select" defaultValue={initial_values.displayAlpha}>
                    <option value={true}>Display choices in Alphabetical</option>
                  </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center">
              <Button className="btn save-btn" callBack={handleSave} label="Save changes"></Button>
              {/* <button className="btn btn-success save-btn" onClick={handleSave}>Save changes</button> */}
              <span className="mx-3">Or</span>
              <Button className="btn text-danger cancel-btn" callBack={handleReset} label="Reset"></Button>
              {/* <button className="btn bg-none text-danger p-0 cancel-btn" onClick={handleReset}>Reset</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
