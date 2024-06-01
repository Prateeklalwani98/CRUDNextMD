"use client";

import { useState } from "react";
import axios from "axios";
import Blog from "./blog";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !note) {
      alert("Please fill in all fields");
      return;
    }
    const data = { title: title, note: note };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/topics",
        data
      );
      const respData = response.data;
      console.log("Submitted to DB: ", respData);
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className="homePage">
      <div className="addNewContainer">
        <h1 className="homeHeading">CRUD App (NEXT Js + MongoDB)</h1>
        <form className="addNewForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inputField"
          />
          <textarea
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="inputField"
          />
          <button type="submit" className="submitButton">
            Add
          </button>
        </form>
      </div>
      <Blog />
    </div>
  );
}
