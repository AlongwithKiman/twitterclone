import React, { useEffect, useRef, useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Tweet from "components/Tweet";

function Home({ userObject }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [photoLink, setPhotoLink] = useState(); //  첨부 사진 미리보기 링크

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>
      setPhotoLink(finishedEvent.currentTarget.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // getTweets();
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      //  디비 실시간 변화를 렌더링해주기 위함.( 스냅샷 )
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tweetArr);
      setTweets(tweetArr);
    });
  }, []);
  console.log(tweets);

  const onSubmit = async (e) => {
    e.preventDefault();
    // create document

    setTweet("");
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObject.uid,
      });
      console.log("tweeted with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // for Photo Attachment

  const photoFile = useRef();
  const clearPhoto = () => {
    setPhotoLink(null);
    photoFile.current.value = null;
  };

  //  setTweets();
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="트윗을 올려라 이말이야"
          maxLength={120}
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={photoFile}
        />
        <input type="submit" value="트윗하기" onClick={onSubmit} />
        {photoLink && (
          <div>
            <img width="50px" height="50px" src={photoLink}></img>
            <button onClick={clearPhoto}>업로드 취소</button>
          </div>
        )}
      </form>

      {/* <button onClick={loadTweets}>load Tweets</button> */}
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObject.uid}
        />
      ))}
    </div>
  );
}
export default Home;
