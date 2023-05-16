import { useContext, useEffect, useRef } from "react"
import { useThemeContextMessages } from "../../containers/messages.container"
import { ChatsMessages } from "./chat.messages.component"
import { SendIcon } from "../../svgs/send.icon"
import { MicrophoneIcon } from "../../svgs/microphone.icon"

export function ChatsComponent() {
    const messagesRef = useRef<any>(null)
    const { messagesComp, handleSubmite, text, setText, handleStartStopClick, microphoneStyle } = useThemeContextMessages()

    useEffect(() => {
        messagesRef.current?.scrollIntoView()
    }, [messagesComp])

    return (
        <div className="main-request-component">
            <div className="request-response">
                <ChatsMessages />
                <div ref={messagesRef}></div>
            </div>
            <div className="request-component-footer">
                <div className="request-textarea">
                    <textarea className="textarea" role="textbox" value={text} onChange={e => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmite(e)}></textarea>
                    <div className="textarea-logos">
                        <button className="textarea-logos-send" onClick={handleSubmite} >
                            <SendIcon className={"svg-icon-on"} />
                        </button>
                        <button className="textarea-logos-record" onClick={(setText) => handleStartStopClick(setText)}>
                            <MicrophoneIcon className={microphoneStyle} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}