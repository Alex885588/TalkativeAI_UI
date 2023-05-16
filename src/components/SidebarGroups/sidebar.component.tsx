import PopUpOfOffers from "../Pop-up/popup.component";
import CreateGroupAndList from "./add.group.and.list";
import {useThemeContextSidebar} from "../../containers/sidebar.container";

export function SidebarComponent({ listOfWorkers}: any) {
    const { isChecked} = useThemeContextSidebar()
    return (
        <div className="sidebar">
            <div className="menu-of-offers">
                <PopUpOfOffers listOfWorkers={listOfWorkers}/>
                {
                    listOfWorkers.map((worker: any,index:number) => {
                        if (!isChecked[worker.id]) return <></>;
                        return <div className="choose-offers-list" key={index}>
                            <img src={worker.iconURL} style={{ width: "100%", height: "100%" }}></img>
                        </div>
                    })
                }
            </div>
            <div className="chats-sidebar">
                <CreateGroupAndList />
            </div>
        </div>
    )
}