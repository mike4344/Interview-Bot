import React, { useState } from "react";

const MailForm = () => {
  const [feedback, setFeedback] = useState("");
  const [feature, setFeature] = useState("");
  const [bugs, setBugs] = useState("");
  const [trigger, setTrigger] = useState(false);

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
        body: JSON.stringify({body: body})
    })
    setTrigger(true)
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

 if (trigger === false)return (
    <form className="form-container" onSubmit={onMail}>
    <div>
    <label>Do you have any feedback on the website?</label>
    <textarea
        className="textarea"
        type="textarea"
        name="feedback"
        onChange={updateFeedback}
        value={feedback}
    ></textarea>
    </div>
    <div>
    <label>Is there any features you would like to see implemented?</label>
    <textarea
        className="textarea"
        type="textarea"
        name="feature"
        onChange={updateFeature}
        value={feature}
    ></textarea>
    </div>
    <div>
    <label>If you experienced any bugs, please share your experience?</label>
    <textarea
        className="textarea"
        type="textarea"
        name="bugs"
        onChange={updateBugs}
        value={bugs}
    ></textarea>
    </div>
    <button className="button signup" type="submit">Send Feedback</button>
    </form>
  );
  if (trigger === true) {
      return (
        <form className="form-container">
        <div>
        Thank you for your feedback!
        </div>
        <div>
        Click outside of this box to continue
        </div>
        </form>
      )
  }
};

export default MailForm;
