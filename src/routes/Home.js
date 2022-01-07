import React, { useEffect, useState } from "react";
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
function Home({ userObject }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "tweets"));
    querySnapshot.forEach((doc) => {
      const tweetObject = { ...doc.data(), id: doc.id };

      setTweets((prev) => [...prev, tweetObject]);
    });
  };

  useEffect(() => {
    // getTweets();
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
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
        <input type="submit" value="트윗하기" onClick={onSubmit} />
      </form>

      {/* <button onClick={loadTweets}>load Tweets</button> */}
      {tweets.map((tweet) => (
        <div id={tweet.id}>
          <h4>{tweet.text}</h4>
        </div>
      ))}
    </div>
  );
}
export default Home;
