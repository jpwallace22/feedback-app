import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeeddbackForm() {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])

  const handleTextChange = ({ target }) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length < 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      if(text.trim().length >= 10) {
          const newFeedback = {
              text,
              rating,
          }
          if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
          } else {
          addFeedback(newFeedback);
          }
          setText('')
     }
  }
  

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service?</h2>
        <RatingSelect select={(selected)=> setRating(selected)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            {feedbackEdit.edit ? 'Update' : 'Send'}
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeeddbackForm;
