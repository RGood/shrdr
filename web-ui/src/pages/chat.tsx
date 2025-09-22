import { JSX, useEffect, useState } from "react";
import { Channel, createClient, Metadata } from "nice-grpc-web";
import { chat } from "@shrdr/protos";
import { AsyncSink } from "nice-grpc-web/src/utils/AsyncSink";


export function Chat(props: {channel: Channel, authToken: string}): JSX.Element {
  // Set up stream for sending chat messages
  const [chatStream] = useState(() => {
    return new AsyncSink<chat.Send>();
  });

  const [chats, setChats] = useState(() => {
    return {} as Record<string, chat.ChatMessage[]>;
  });

  const [curRoom] = useState<string>("main");

  useEffect(() => {
    const abort = new AbortController();

    const client = createClient(chat.ChatDefinition, props.channel)

    if(!props.authToken) {
      abort.abort();
      return;
    }

    const md = new Metadata();
    md.set("shrdr-auth", props.authToken);

    const chatMessages = client.connect(
      chatStream,
      {
        signal: abort.signal,
        metadata: md,
      },
    );

    (async () => {
      try {
        for await (const chatMessage of chatStream) {
          // TODO: handle incoming chat messages
          console.log("Received chat message:", chatMessage);
        }
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("Error in chat stream:", error);
        }
      }
    })();
  }, [props.authToken, props.channel, chatStream]);

  return (
    <div style={{width: '100%', height: '100%'}}></div>
  );
}
