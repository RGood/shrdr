import './App.css';
import { JSX, useState, useEffect } from 'react';
import { createChannel, createClient } from 'nice-grpc-web';
import * as Identity from '@shrdr/protos/dist/generated/index.identity';
import { Login } from './pages/login';

const channel = createChannel('http://localhost:17778');
const client = createClient(Identity.AuthenticationDefinition, channel)

function App(): JSX.Element {
  const [authInfo, setAuthInfo] = useState<Identity.AuthInfo | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    const abort = new AbortController();

    if(!username) {
      abort.abort();
      return;
    }

    const authStream = client.connect({
      username: username,
    }, { signal: abort.signal });

    (async () => {
      try {
        for await (const authData of authStream) {
          setAuthInfo(authData);
        }
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("Error in auth stream:", error);
        }
      }
    })();

    return () => {
      abort.abort();
    }
  }, [username]);

  return (
    <div className="App">
      <header className="App-header">
        { authInfo === null ?
          <Login enterName={setUsername} /> :
          <div>
            Welcome {authInfo ? authInfo.user?.name + "@" + authInfo.user?.id : "Loading..."}
          </div>
        }
      </header>
    </div>
  );
}

export default App;
