import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function useTranscriptionService() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isRecording, setIsRecording] = useState(false);
    const [timeSlice, setTimeSlice] = useState(4000);
    const [transcription, setTranscription] = useState("");

    const micTimer = React.useRef<NodeJS.Timer | undefined>(undefined);

    const stopRecording = () => {
        setIsRecording(false);
    };

    const startRecording = () => {
        setIsRecording(true);
    };

    const recordIntervalAndEmit = (stream: MediaStream) => {
        const recorder = new MediaRecorder(stream);
        let audioBuffer: Blob;

        recorder.ondataavailable = (e) => (audioBuffer = e.data);
        recorder.onstop = (e) => {
            socket.emit("audio-chunk", audioBuffer);
        };

        setTimeout(() => recorder.stop(), timeSlice);

        recorder.start();
    };

    const onTranscribedText = (value: string) => {
        setTranscription(value);
    };

    useEffect(() => {
        if (isRecording) {
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                        micTimer.current = setInterval(() => {
                            recordIntervalAndEmit(stream);
                        }, timeSlice);
                    });
            } else {
                setIsRecording(false);
            }
        } else {
            clearInterval(micTimer.current);
        }
    }, [isRecording]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("transcribed-text", onTranscribedText);
    }, []);

    return {
        isRecording,
        transcription,
        startRecording,
        stopRecording,
    };
}
