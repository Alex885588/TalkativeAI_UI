import { TextToSpeech } from "../../svgs/textToSpeech.icon";

export function ResponseFromAiComponent({ text, textToSpeech }: any) {
    return (
        <div className="response-component">
            <div className="response-from-ai">
                <div className="response-from-ai-text">
                    <h4>Chat GPT</h4>
                    <p>{text}</p>
                </div>
                <div className="text-to-speech">
                    <button onClick={() => textToSpeech(text)}>
                        <TextToSpeech />
                    </button>
                </div>
            </div>
        </div>

    )
}