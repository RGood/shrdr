import { JSX, useState } from 'react';

export function Login(props: {enterName: (name: string) => void}): JSX.Element {
    const [username, setUsername] = useState("");
    return(<div>
        <h1>Login Page</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            Username:&nbsp;
            <form onSubmit={(e) => {
                e.preventDefault();
                props.enterName(username)
            }}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Connect</button>
            </form>
        </div>
    </div>);
}
