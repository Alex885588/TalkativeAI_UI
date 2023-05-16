import { useThemeContextSidebar } from "../../containers/sidebar.container"
import { GroupComponent } from "./group.item.component"

export function ListOfGroups() {
    const { groupInfo } = useThemeContextSidebar()
    return (groupInfo.data?.map((item: any,index:number) => {
        return (<GroupComponent index={item.chatId} groupName={item.chatName} key={index}/>)
    }))
}