import { useThemeContextSidebar } from "../../containers/sidebar.container"
import { EditIcon } from "../../svgs/edit.icon"
import { SaveIcon } from "../../svgs/save.icon"

export function GroupComponent({ index, groupName }: any) {
    const { isEdit, saveNewGroupName, setGroupName, editClick, setGroupId } = useThemeContextSidebar()
    return (
        <>{isEdit ? (<div className="group" onClick={() => { setGroupId(index) }}>
            <input className="group-name-edit" defaultValue={groupName} onChange={e => setGroupName(e.target.value)} />
            <button className="group-edit-name" onClick={() => saveNewGroupName(index)}>
                <SaveIcon />
            </button>
        </div>) : (<div className="group" onClick={() => { setGroupId(index) }}>
            <input className="group-name" defaultValue={groupName} />
            <button className="group-edit-name" onClick={e => editClick(e)}>
                <EditIcon />
            </button>
        </div>)}</>
    )
} 