"use client";

import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function DelBtn({ id }) {
  async function handleDel() {
    const confirmDelete = confirm("You wish to delete this bill permanently?");

    if (!confirmDelete) {
      return;
    }

    try {
      const resp = await axios.delete(
        `http://localhost:3000/api/topics?id=${id}`
      );
      console.log("Item deleted:", response.data);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }
  return <MdDelete onClick={handleDel} className="delBtn" />;
}
