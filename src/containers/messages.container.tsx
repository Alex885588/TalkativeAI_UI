import { useContext, useEffect, useState } from "react";
import { ChatsComponent } from "../components/Chat/chat.component";
import { ApiAuth } from "../service/api/api.auth";
import { ApiMessages } from "../service/api/api.messages";
import { ApiChatGpt } from "../service/api/api.chatgpt";
import React from "react";
import { useThemeContextApp } from "./app.container";
import useTranscriptionService from "../service/TranscriptionService";

const userService = new ApiAuth()
const messagesService = new ApiMessages()
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
const messagesApi = new ApiMessages();
const chatgptApi = new ApiChatGpt();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
const ThemeContext = React.createContext<any>({})
export const useThemeContextMessages = () => useContext(ThemeContext)
export function MessagesContainer() {
    const [messagesComp, setMessagesComp] = useState([]);
    const [userData, setUserData] = useState([])
    const [text, setText] = useState('')
    const [isListening, setIsListening] = useState(false);
    const [microphoneStyle, setMicrophoneStyle] = useState("svg-icon-on");

    //const {transcription, startRecording, stopRecording} = useTranscriptionService();

    let isSpeaking = false;
    const { groupId } = useThemeContextApp()
    useEffect(() => {
        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }
        recognition.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setText(transcript);
        };
        recognition.onerror = event => {
            console.error(event.error);
            setIsListening(false);
        };
        return () => {
            recognition.stop();
        };
    }, [isListening]);

    useEffect(() => {
        async function fetchData() {
            const userData: any = await userService.getUserInfo()
            const getMessages: any = await messagesService.getMessagesOfuserInChats(groupId)
            setMessagesComp(getMessages)
            setUserData(userData)
        }
        fetchData()
    }, [groupId])

    const handleStartStopClick = () => {
        setIsListening(prevState => !prevState);
        const newStyle = microphoneStyle === 'svg-icon-on' ? 'svg-icon-off' : 'svg-icon-on';
        setMicrophoneStyle(newStyle);
    };

    const handleSubmite = async () => {
        if (text.length === 0) { return }
        const reqText = text
        setText('')
        await messagesApi.createMessage(reqText, groupId)
        const getMessagesAfterRequest: any = await messagesService.getMessagesOfuserInChats(groupId)
        setMessagesComp(getMessagesAfterRequest)
        const responseFromAi = await chatgptApi.createAiRequest(reqText)
        await messagesApi.createMessageForAi(responseFromAi.data, groupId)
        const getMessagesAfterResponse: any = await messagesService.getMessagesOfuserInChats(groupId)
        setMessagesComp(getMessagesAfterResponse)
    }

    function textToSpeech(text: string) {
        if (synth.speaking) {
            synth.cancel();
            isSpeaking = false;
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = synth.getVoices()[0];
        utterance.volume = 1;
        utterance.pitch = 1;
        utterance.rate = 1;
        synth.speak(utterance);
        isSpeaking = true;
    }

    return (
        <ThemeContext.Provider value={{ textToSpeech, messagesComp, userData, handleSubmite, text, setText, handleStartStopClick, microphoneStyle }}>
            <ChatsComponent />
        </ThemeContext.Provider>
    );
}


