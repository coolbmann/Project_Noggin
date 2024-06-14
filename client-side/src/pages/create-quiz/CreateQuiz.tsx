import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./createQuiz.module.css";
import Tooltip from "../../components/Tooltip/Tooltip";
import Avatar from "../../assets/icons/profileAvatar.png";
import EmptyState from "../../assets/icons/Empty State Illustration.svg";
import { FaRegTrashCan } from "react-icons/fa6";
import InputDropDown from "../../components/InputDropdown/InputDropDown";
import CustomQuizCard from "../../components/DraggableQuizComponent/CustomQuizCard";
import { ToWords } from "to-words";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import axios from "axios";
import Toast from "../../components/Toast/Toast";
import config from "../../config/config";

interface submittedQuestionsProps {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  order: number;
  key: string;
}

interface customQuizProps {
  quiz: { key: string; title: string };
  questions: submittedQuestionsProps[];
}

const CreateQuiz = () => {
  // Define quiz data formatted for API
  const [customQuizData, setCustomQuizData] = useState<customQuizProps>();

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
  const [createQuizButtonActive, setCreateQuizButtonActive] = useState(false);

  // State to track current question in editor
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  // Toast
  const [successToastVisible, setSuccessToastVisible] =
    useState<boolean>(false);
  const [failToastVisible, setFailToastVisible] = useState<boolean>(false);

  const questionObject = {} as submittedQuestionsProps;
  const toWords = new ToWords();

  // Sortable
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Enable / Disable button states
  const checkFormFieldsValid = () => {
    setSaveButtonActive(question !== "" && correctAnswer !== ""); // Check if form fields are valid to add question
    setCreateQuizButtonActive(
      submittedQuestions.length > 0 && quizTitle !== ""
    ); // Check at least one question is submitted
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
        const newArray = [...prevArray, questionObject];
        return newArray.sort((a, b) => a.order - b.order);
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
                  setCorrectAnswer("");
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
              key={item.key}
              itemKey={item.key}
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

  const handleDragEnd = (event: any) => {
    console.log("Drag end called");
    console.log(typeof event);
    const { active, over } = event;
    console.log("ACTIVE" + active.id);
    console.log("OVER" + over.id);

    if (active.id !== over.id) {
      setSubmittedQuestions((items) => {
        // Reorder array for UI
        const activeIndex = items.findIndex((item) => item.key === active.id);
        const overIndex = items.findIndex((item) => item.key === over.id);

        const sortedArray = arrayMove(items, activeIndex, overIndex);
        // Update order value
        return sortedArray.map((item, index) => {
          return { ...item, order: index };
        });
      });
    }
  };

  const formatQuizData = () => {
    setCustomQuizData({
      quiz: { key: crypto.randomUUID(), title: quizTitle },
      questions: submittedQuestions,
    });
  };

  // Axios Call to DB
  const postQuiz = async () => {
    try {
      const { data, status } = await axios.post(
        `${config.api.baseURL}/collections/create-quiz`,
        customQuizData
      );
      if (status === 200) {
        setSuccessToastVisible(true);
        setSubmittedQuestions([]);
        setQuestion("");
        setAnswerOptions([]);
        setCurrentAnswerOption("");
        setCorrectAnswer("");
        setActiveQuestion(null);
        setQuizTitle("");
      } else {
        setFailToastVisible(true);
      }
    } catch (error) {
      setFailToastVisible(true);
    }
  };

  useEffect(() => {
    console.log(submittedQuestions);
    console.log("Active Question: " + activeQuestion);
    renderQuestionPreviewCards();
    checkFormFieldsValid();
    formatQuizData();
  }, [submittedQuestions, activeQuestion, quizTitle]);

  useEffect(() => {
    checkFormFieldsValid();
  }, [question, correctAnswer, quizTitle]);

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
            {submittedQuestions.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={submittedQuestions.map((item) => item.key)}
                  strategy={verticalListSortingStrategy}
                >
                  {renderQuestionPreviewCards()}
                </SortableContext>
              </DndContext>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "35%",
                  paddingLeft: "1.5rem",
                  height: "100%",
                  gap: "1rem",
                }}
              >
                <div>
                  <img src={EmptyState} alt="Empty State" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    No Questions Added to Quiz
                  </h1>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.825rem",
                      padding: "0 0.5rem",
                    }}
                  >
                    Add questions and answers through the editor to see them
                    here.
                    <br />
                    <br />
                    You can re-order and edit questions once they’ve been saved,
                    by clicking, and dragging-and-dropping the cards.
                  </p>
                </div>
              </div>
            )}
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
                    value={quizTitle}
                    onChange={(e) => {
                      setQuizTitle(e.target.value);
                    }}
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
                  style={
                    activeQuestion === null
                      ? { display: "none" }
                      : {
                          marginRight: "auto",
                          backgroundColor: "transparent",
                          borderColor: "#ff4d4d",
                          color: "#ff4d4d",
                        }
                  }
                  className={styles.saveButton}
                  onClick={() => {
                    setSubmittedQuestions((prevArray) => {
                      const newArray = prevArray
                        .filter((question) => question.key !== activeQuestion)
                        .map((element, idx) => {
                          return { ...element, order: idx };
                        });
                      return newArray;
                    });
                    setQuestion("");
                    setAnswerOptions([]);
                    setCurrentAnswerOption("");
                    setCorrectAnswer("");
                    setActiveQuestion(null);
                  }}
                >
                  Delete Question
                </button>
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
        <div className={styles.footer}>
          <button
            className={styles.createQuizButton}
            disabled={!createQuizButtonActive}
            onClick={() => {
              postQuiz();
            }}
          >
            Create Quiz
          </button>
        </div>
      </div>
      {successToastVisible ? (
        <Toast
          heading="Woohoo!"
          caption="Check out your quiz in the homepage!"
          animationEnd={() => setSuccessToastVisible(false)}
          type="green"
        />
      ) : null}
      {failToastVisible ? (
        <Toast
          heading="Uh oh..."
          caption="Try again at a different time"
          animationEnd={() => setFailToastVisible(false)}
          type="red"
        />
      ) : null}
    </div>
  );
};

export default CreateQuiz;
