import React, { useEffect, useState } from "react";
import previewImage from "../assests/preview.png";
import axios from "axios";
import Loader from "./Loader";
// constant
import { surpriseMePrompts } from "../constant";


const ServerUrl = "https://ai-imagegenerator-backend.onrender.com"
// const ServerUrl = "http://localhost:5555"
function Create() {
  const [showLoader, setShowLoader] = useState(false);
  const [userInputValue, setUserInputValue] = useState({
    userName: "",
    prompt: "",
    photo: "",
  });

  const [share, setShare] = useState(false);

  // inputhandler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInputValue({
      ...userInputValue,
      [name]: value,
    });
  };

  // supriseHandler
  const supriseHandler = () => {
    const randomNumber = Math.floor(Math.random() * 50);

    const randomPrompt = surpriseMePrompts[randomNumber];
    if (randomPrompt == undefined) {
      return surpriseMePrompts[randomNumber];
    }
    setUserInputValue((prevState) => {
      return { ...prevState, prompt: randomPrompt };
    });
  };

  // generateButton
  const generateButtonHandler = async (userValue) => {
    if (userInputValue.userName === "" || userInputValue.prompt == "") {
      alert("Please enter the Name and prompt properly.");
    } else {
      try {
        setShowLoader(true);
        const { prompt } = userValue;
        console.log(prompt);
        const resp = await axios.post(`${ServerUrl}/api/v1/dalle`, {
          prompt: prompt,
        });

        let { photo } = resp.data;

        // UPDATING THE IMAGE URL IN THE STATE
        setUserInputValue((prevState) => {
          return { ...prevState, photo: photo };
        });

        if (setUserInputValue.photo !== "") setShowLoader(false);
      } catch (error) {
        console.log("error while calling dalle post", error);
      }
    }
  };

  // Share with community handler
  const shareCommunityHandler = async (userInput) => {
    if (userInput.photo == "") {
      alert("Can't be share without any image");
    } else {     
      setShare(true)
      const { userName, prompt, photo } = userInput;
      const resp = await axios.post(`${ServerUrl}/api/v1/post`, {
        name: userName,
        prompt: prompt,
        photo: photo,
      });
      console.log(resp);
      setShare(false)
    }
  };

  return (
    <section className="py-4 px-4 sm:px-12 lg:w-2/3">
      <h1 className="my-2">Create</h1>
      <p className="my-2">
        Create imaginative and visually stunning images through DALL-E AI and
        share them with the community
      </p>

      <div className="mt-16">
        <label htmlFor="name" className="font-semibold">
          Your name
        </label>
        <input
          type="text"
          name="userName"
          value={userInputValue.userName}
          onChange={inputChangeHandler}
          id="userName"
          placeholder="Name"
          className="border  rounded-lg w-full outline-none px-4 py-1 font-[14px] my-4"
        />

        <div className="mt-6">
          <div className="flex items-center">
            <label htmlFor="prompt" className="font-semibold">
              Prompt
            </label>
            <button
              className=" px-4 border-[1px] border-gray-200 bg-transparent rounded-lg ml-6 font-[300]"
              onClick={supriseHandler}
            >
              Surprise me
            </button>
          </div>
          <input
            type="text"
            name="prompt"
            value={userInputValue.prompt}
            onChange={inputChangeHandler}
            id="prompt"
            placeholder="Painting of royal room which have some realstic vibes."
            className="border  rounded-lg w-full outline-none px-4 py-1 font-[14px] my-4"
          />
        </div>
      </div>

      <div className="border-gray-300 border-[1px] w-[300px] h-[300px] mt-4 rounded-lg overflow-hidden relative">
        {showLoader && (
          <span className="absolute top-1/2 shadow-gray-300 shadow-xl   z-20 right-1/2 text-white">
            <Loader bgColor="bg-white" />
          </span>
        )}
        {userInputValue.photo !== "" ? (
          <img src={userInputValue?.photo} alt="genearted-image" />
        ) : (
          <img
            src={previewImage}
            alt="result-image"
            className="w-full h-full opacity-30"
          />
        )}
      </div>

      <button
        className="py-2 px-6 bg-green-800 text-white font-semibold rounded-lg my-6"
        onClick={() => generateButtonHandler(userInputValue)}
      >
        Generate
      </button>

      <p className="font-normal tracking-normal text-[14px]">
        Once you have created the image you want, you can share it with others
        in the community
      </p>
      <button
        className="py-2 px-6 bg-sky-600 text-white font-semibold rounded-lg my-6"
        onClick={() => shareCommunityHandler(userInputValue)}
      >
        {share ?"Sharing...": " Share with the community"  }
      </button>
    </section>
  );
}

export default Create;
