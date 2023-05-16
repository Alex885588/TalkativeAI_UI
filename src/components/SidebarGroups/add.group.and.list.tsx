import {useThemeContextSidebar} from "../../containers/sidebar.container"
import { ListOfGroups } from "./list.of.groups"

export default function CreateGroupAndList() {
    const { groupName, setGroupName, handleAddGroup } = useThemeContextSidebar()
    return (
        <div className="add-group-in-chat">
            <div className="add-group">
                <h3>Create New Group</h3>
                <div className="adding-name-field">
                    <input className="input-name-field" value={groupName} onChange={e => setGroupName(e.target.value)} />
                    <button className="add-group-button" onClick={handleAddGroup}>
                        +
                    </button>
                </div>
            </div>
            <div className="group-list">
                <ListOfGroups />
            </div>
        </div>
    )
}