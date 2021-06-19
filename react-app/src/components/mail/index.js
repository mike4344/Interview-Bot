import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

const MailForm = () => {
  const [feedback, setFeedback] = useState("");
  const [feature, setFeature] = useState("");
  const [bugs, setBugs] = useState("");

  const onMail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let body = feedback + ' feature request ' + feature + ' bugs ' + bugs
    formData.append("body", body);
    await fetch('/mail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    return <Redirect to="/" />;
    }

  const updateFeedback = (e) => {
    setFeedback(e.target.value);
  };
  const updateFeature = (e) => {
    setFeature(e.target.value);
  };
  const updateBugs = (e) => {
    setBugs(e.target.value);
  };

 return (
    <form className="form-container" onSubmit={onMail}>
      <div>
        <label>Do you have any feedback on the website?</label>
        <input
         className="textarea"
         type="textarea"
         name="feedback"
          onChange={updateFeedback}
          value={feedback}
        ></input>
      </div>
      <div>
        <label>Is there any features you would like to see implemented?</label>
        <input
         className="textarea"
         type="textarea"
         name="feature"
          onChange={updateFeature}
          value={feature}
        ></input>
      </div>
      <div>
        <label>If you experienced any bugs, please share your experience?</label>
        <input
         className="textarea"
         type="textarea"
         name="bugs"
          onChange={updateBugs}
          value={bugs}
        ></input>
      </div>
      <button className="button signup" type="submit">Send Feedback</button>
    </form>
  );
};

export default MailForm;
