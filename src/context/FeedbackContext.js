import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
     
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, sit perferendis delectus tenetur illo asperiores magni quis consectetur quaerat sint.",
      rating: 10,
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, reprehenderit!",
      rating: 8,
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque expedita voluptas, quod officia nisi omnis.",
      rating: 5,
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
})

 //delete feedback
  const deleteFeedback = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete? There is no going back from this!"
      )
    ) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };


  //edit feedback
 const editFeedback = (item) => {
     setFeedbackEdit({
         item,
         edit: true,
     })
 }

 //update feedback item
const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    setFeedbackEdit({  
        item:{},
        edit: false
    })
}



  return (
    <FeedbackContext.Provider
      value={{
          deleteFeedback,
          addFeedback,
          editFeedback,
          updateFeedback,
          feedbackEdit,
          feedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
