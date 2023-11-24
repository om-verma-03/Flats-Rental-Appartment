import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Replies = () => {
    const [reply, setReply] = useState("");
    const [replyList, setReplyList] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const addReply = () => {
        fetch("https://flat-apartment.onrender.com/create/reply", {
            method: "POST",
            body: JSON.stringify({
                id,
                userName: localStorage.getItem("user"),
                reply,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                navigate("/forum");
            })
            .catch((err) => console.error(err));
    };

    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        addReply();
        setReply("");
    };

    useEffect(() => {
        const fetchReplies = () => {
            fetch("https://flat-apartment.onrender.com/thread/replies", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplyList(data.replies);
                    setTitle(data.title);
                })
                .catch((err) => console.error(err));
        };
        fetchReplies();
    }, [id]);
    return (
        <main className='replies'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    type='text'
                    name='reply'
                    className='modalInput'
                />

                <button className='modalBtn'>SEND</button>
            </form>
            <div className='thread__container'>
                {replyList.map((reply) => (
                    <div className='thread__item'>
                        <p>{reply.text}</p>
                        <div className='react__container'>
                            <p style={{ opacity: "0.5" }}>by {reply.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Replies;