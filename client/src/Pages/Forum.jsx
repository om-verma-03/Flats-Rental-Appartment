import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Likes from '../components/Likes'
import Comments from "../components/Comments";
import { Button } from "@chakra-ui/react";
const Forum = () => {
    const [thread, setThread] = useState("");
    const [threadList, setThreadList] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("token")) {
                navigate("/");
            } else {
                fetch("https://flat-apartment.onrender.com/all/threads")
                    .then((res) => res.json())
                    .then((data) => {
                        setThreadList(data.threads)
                        console.log('threads= ', data.threads)
                    })

                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }, [navigate]);

    const handleSecureRequest = () => {
        axios.get('https://flat-apartment.onrender.com/secure', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Failed to access secure route', error);
            });
    }


    const createThread = () => {
        axios.post("https://flat-apartment.onrender.com/create/thread", {
            thread: thread,
            token: token,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                console.log(res.data);
                setThreadList(res.data.threads);
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        createThread();
        setThread("");
    };
    return (
        <>
            <main className='mt-24 flex flex-col items-center'>
                <h2 className='homeTitle text-4xl'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button><Button colorScheme="blue">CREATE THREAD</Button></button>
                </form>
            </main>
            <div className='thread__container'>
                {threadList.map((thread) => (
                    <div className='thread__item text-white' key={thread.id}>
                        <p className="text-xl">{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Forum;