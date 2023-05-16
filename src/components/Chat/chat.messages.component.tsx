import { useContext } from "react"
import { useThemeContextMessages } from "../../containers/messages.container"
import { RequestFromUserComponent } from "./request.from.user.component"
import { ResponseFromAiComponent } from "./response.from.ai"

export function ChatsMessages() {
    const { messagesComp, textToSpeech, userData } = useThemeContextMessages()
    return (messagesComp.data?.map((item: any) => {
        if (item.aiId === null) {
            return (<RequestFromUserComponent key={item.id} text={item.text} username={userData.data.email} />)
        } else {
            return (<ResponseFromAiComponent key={item.id} text={item.text} textToSpeech={textToSpeech} />)
        }
    }))
} 