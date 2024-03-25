import React from "react";
import { questionImageArray } from "../assets/images";

interface props {
  imageURL: string;
}

const QuestionImage = ({ imageURL }: props): React.JSX.Element => {
  const currentImage = imageURL;

  return (
    <div className="image-container">
      <img className="question-image" src={imageURL} />
    </div>
  );
};

export default QuestionImage;
