import withAuth from "../guard/AuthGuard";
import { SidebarContainer } from "./sidebar.container";
import React, { useContext, useEffect, useState } from "react";
import { MessagesContainer } from "./messages.container";


const ThemeContext = React.createContext<any>({})
export const useThemeContextApp = ()=>useContext(ThemeContext)
function AppContainer() {
    const [groupId, setGroupId] = useState(Number);
    return (
        <div className="main-component">
            <ThemeContext.Provider value={{ groupId, setGroupId }}>
                <SidebarContainer />
                <MessagesContainer />
            </ThemeContext.Provider>
        </div>
    )
}
export default withAuth(AppContainer)

