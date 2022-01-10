import { dbService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
function Tweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("정말로 삭제하시렵니까");
    if (ok) {
      // delete
      const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
      deleteDoc(tweetTextRef);
    } else {
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    updateDoc(tweetTextRef, { text: newTweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form>
            <input
              type="text"
              placeholder="Edit your Tweet"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              required
            ></input>
            <input type="submit" value="수정" onClick={onSubmit}></input>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <h4>{tweetObj.text}</h4>
      )}
      {isOwner && !editing && (
        <>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={toggleEditing}>수정</button>
        </>
      )}
    </div>
  );
}

export default Tweet;
