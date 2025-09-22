import { JSX, useState } from "react";
import { Channel, createClient } from "nice-grpc-web";
import { FilesystemDefinition } from "@shrdr/protos/dist/generated/index.filesystem";

export function Filesystems(props: {channel: Channel}): JSX.Element {
  const [fsClient] = useState(() => {
    return createClient(FilesystemDefinition, props.channel)
  });

  return (
    <div></div>
  );
}
