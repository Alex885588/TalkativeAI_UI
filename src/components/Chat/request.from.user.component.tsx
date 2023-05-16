export function RequestFromUserComponent({ text, username }: any) {
    return (
        <div className="request-component">
            <div className="request-from-user">
                <h4>{username}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
} 
