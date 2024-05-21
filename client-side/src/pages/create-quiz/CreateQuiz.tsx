import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./createQuiz.module.css";
import Tooltip from "../../components/Tooltip/Tooltip";
import Avatar from "../../assets/icons/profileAvatar.png";
import { FaRegTrashCan } from "react-icons/fa6";
import Accordion from "../../components/UserDetails/Accordion";
import InputDropDown from "../../components/InputDropdown/InputDropDown";
import CustomQuizCard from "../../components/DraggableQuizComponent/CustomQuizCard";
import { set } from "date-fns";
import { randomUUID } from "crypto";
import { ToWords } from "to-words";

interface submittedQuestionsProps {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  order: number;
  key: string;
}

const CreateQuiz = () => {
  // Define quiz questions object array
  const [submittedQuestions, setSubmittedQuestions] = useState<
    submittedQuestionsProps[]
  >([]);

  // Define state for quiz title
  const [quizTitle, setQuizTitle] = useState("");

  // Define state for current question in editor
  const [question, setQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [currentAnswerOption, setCurrentAnswerOption] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Button states
  const [saveButtonActive, setSaveButtonActive] = useState(false);
  const [createQuizButtonActive, setCreatequizButtonActive] = useState(false);

  // State to track current question in editor
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const questionObject = {} as submittedQuestionsProps;
  const toWords = new ToWords();

  // Function to check if all fields are valid
  const checkFormFieldsValid = () => {
    setSaveButtonActive(question !== "" && correctAnswer !== "");
  };

  const saveQuestion = (
    question: string,
    answerOptions: string[],
    correctAnswer: string
  ) => {
    questionObject.question = question;
    questionObject.answerOptions = answerOptions;
    questionObject.correctAnswer = correctAnswer;

    if (activeQuestion !== null) {
      const index = submittedQuestions.findIndex(
        (question) => question.key === activeQuestion
      );
      questionObject.order = submittedQuestions[index].order;
      questionObject.key = submittedQuestions[index].key;
      setSubmittedQuestions((submittedQuestions) => {
        const prevArray = submittedQuestions.filter(
          (question) => question.key !== activeQuestion
        );
        return [...prevArray, questionObject];
      });
    } else {
      questionObject.order = submittedQuestions.length;
      questionObject.key = crypto.randomUUID();
      setSubmittedQuestions((submittedQuestions) => [
        ...submittedQuestions,
        questionObject,
      ]);
    }
  };

  const handleAnswerOptionSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    index?: number
  ) => {
    e.preventDefault();

    if (index === undefined) {
      if (currentAnswerOption.trim() !== "") {
        e.preventDefault();
        setAnswerOptions((prev) => [...prev, currentAnswerOption]);
        setCurrentAnswerOption("");
      }
    }

    setCorrectAnswer("");
  };

  const renderAnswerOptionInputs = () => {
    return (
      <>
        {answerOptions.map((option, index) => {
          return (
            <form
              key={index}
              onSubmit={handleAnswerOptionSubmit}
              className={styles.inputForm}
            >
              <input
                type="text"
                placeholder="Hit enter for each new option"
                value={option}
                onChange={(e) => {
                  setAnswerOptions((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? e.target.value : item
                    )
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
              />
              <button
                type="button"
                className={styles.removeInputButton}
                onClick={() => {
                  console.log("index" + index);
                  setAnswerOptions((prev) =>
                    prev.filter((item, idx) => idx !== index)
                  );
                  setCorrectAnswer("");
                }}
              >
                <FaRegTrashCan color="#6f6f73" />
              </button>
            </form>
          );
        })}
        {answerOptions.length < 4 ? (
          <form
            onSubmit={handleAnswerOptionSubmit}
            className={styles.inputForm}
          >
            <input
              type="text"
              placeholder="Hit enter for each new option"
              value={currentAnswerOption}
              onChange={(e) => setCurrentAnswerOption(e.target.value)}
            />
          </form>
        ) : null}
      </>
    );
  };

  const renderQuestionPreviewCards = () => {
    return (
      <>
        {submittedQuestions.map((item) => {
          return (
            <CustomQuizCard
              key={item.order}
              selected={activeQuestion === item.key ? true : false}
              order={item.order}
              title={item.question}
              onClickHandler={() => {
                setActiveQuestion(item.key);
                setQuestion(item.question);
                setAnswerOptions(item.answerOptions);
                setCorrectAnswer(item.correctAnswer);
              }}
            />
          );
        })}
      </>
    );
  };

  useEffect(() => {
    console.log(submittedQuestions);
    console.log("Active Question: " + activeQuestion);
    renderQuestionPreviewCards();
  }, [submittedQuestions, activeQuestion]);

  useEffect(() => {
    checkFormFieldsValid();
  }, [question, correctAnswer]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "14rem auto",
        backgroundColor: "#fcfcfd",
      }}
    >
      <Sidebar />
      <div>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.quizPreviewContainer}>
            {renderQuestionPreviewCards()}
          </div>
          <div className={styles.editorContainer}>
            <div style={{ width: "100%", position: "absolute", top: "-4rem" }}>
              <Tooltip
                bgcolor="#FFF3E1E3"
                text="If you can’t add think of ten questions, we’ll add the rest!"
              />
            </div>
            <div className={styles.editorInputContainer}>
              <div className={styles.editorTitle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                  }}
                >
                  <img style={{ width: "100%" }} src={Avatar} alt="" />
                </div>
                <div>
                  <h1>New Community Quiz</h1>
                  <p>
                    Use this form to add your own quiz questions to the app!
                  </p>
                </div>
              </div>
              <div>
                <div className={styles.inputHeading}>
                  What do you want to name this quiz?
                </div>
                <form
                  className={styles.inputForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Give this quiz a title"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </form>
              </div>
              <div className={styles.divider}></div>
              <div>
                <h1>
                  Question{" "}
                  {activeQuestion !== null
                    ? toWords.convert(
                        submittedQuestions[
                          submittedQuestions.findIndex(
                            (question) => question.key === activeQuestion
                          )
                        ].order + 1
                      )
                    : toWords.convert(submittedQuestions.length + 1)}
                </h1>
              </div>
              <div>
                <div className={styles.inputHeading}>
                  What is the question?{" "}
                </div>
                <form
                  className={styles.inputForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Go on, put up a headscratcher!"
                    value={question}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    onChange={(e) => {
                      setQuestion(() => e.target.value);
                    }}
                  />
                </form>
              </div>
              <div>
                <div className={styles.inputHeading}>
                  What are the answer options?
                </div>
                {renderAnswerOptionInputs()}
              </div>
              <div>
                <div className={styles.inputHeading}>
                  Which is the correct answer?
                </div>
                <InputDropDown
                  options={answerOptions}
                  handleSelection={(selection) => {
                    setCorrectAnswer(() => selection);
                  }}
                  value={correctAnswer}
                ></InputDropDown>
              </div>
              <div className={styles.inputFooter}>
                <button
                  disabled={!saveButtonActive}
                  className={styles.saveButton}
                  onClick={() => {
                    saveQuestion(question, answerOptions, correctAnswer);
                    setActiveQuestion(questionObject.key);
                  }}
                >
                  Save
                </button>
                <button
                  disabled={!saveButtonActive}
                  className={styles.saveAndAddButton}
                  onClick={() => {
                    saveQuestion(question, answerOptions, correctAnswer);
                    setQuestion("");
                    setAnswerOptions([]);
                    setCurrentAnswerOption("");
                    setCorrectAnswer("");
                    setActiveQuestion(null);
                  }}
                >
                  Save & Add Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
