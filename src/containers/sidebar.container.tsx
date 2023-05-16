import { useContext, useEffect, useState } from "react";
import { ApiChat } from "../service/api/api.chats";
import { ApiWorkers } from "../service/api/api.workers";
import { ApiWorkersType } from "../service/api/api.workers-type";
import { SidebarComponent } from "../components/SidebarGroups/sidebar.component";
import React from "react";
import { useThemeContextApp } from "./app.container";
import { ApiAuth } from "../service/api/api.auth";

const workersTypeService = new ApiWorkersType()
const workersService = new ApiWorkers()
const usersInChatsService = new ApiAuth()
const chatsService = new ApiChat()
const workers = new ApiWorkers()
const ThemeContext = React.createContext<any>({})
export const useThemeContextSidebar = () => useContext(ThemeContext)
export function SidebarContainer() {
    const [groupInfo, setGroupInfo] = useState([])
    const [groupName, setGroupName] = useState('')
    const [model, setModel] = useState(false)
    const [listOfWorkers, setListOfWorkers] = useState([])
    const [isChecked, setIsChecked] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const { setGroupId } = useThemeContextApp()
    useEffect(() => {
        async function fetchData() {
            try {
                const [responseWorkersType, responseWorkers, responseUsersInChats]: any = await Promise.all([
                    workersTypeService.getAllWorkerTypes(),
                    workersService.getActiveServices(),
                    usersInChatsService.getChats(),
                ]);
                setGroupId(responseUsersInChats.data[0].chatId)
                setGroupInfo(responseUsersInChats)
                setListOfWorkers(responseWorkersType.data);
                const updatedCheckboxes = responseWorkers.data.reduce((acc: { [key: number]: boolean }, item: any) => {
                    acc[+item.workerTypeId] = true;
                    return acc;
                }, { ...isChecked });
                setIsChecked(updatedCheckboxes);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [groupName]);

    const handleCheckboxChange = async (event: any) => {
        const updatedCheckboxes = { ...isChecked, [+event.target.id]: event.target.checked }
        if (event.target.checked) {
            await workers.createChoosenServices(event.target.id, event.target.nextSibling.textContent)
        }
        setIsChecked(updatedCheckboxes)
    };

    const toggleModel = () => {
        setModel(!model)
    }

    const editClick = () => {
        setIsEdit(!isEdit)
    }

    const saveNewGroupName = async (id: number) => {
        setGroupName('')
        setIsEdit(!isEdit)
        await chatsService.updateChatName(id, groupName)
    }

    const handleAddGroup = async () => {
        const service = new ApiChat()
        await service.createChat(groupName || 'Group')
        setGroupName('')
    };

    return (<ThemeContext.Provider value={{ saveNewGroupName, isEdit, setGroupId, groupInfo, groupName, setGroupName, model, handleAddGroup, toggleModel, isChecked, setIsChecked, editClick, handleCheckboxChange}}>
        <SidebarComponent listOfWorkers={listOfWorkers} />
    </ThemeContext.Provider>
    )
}