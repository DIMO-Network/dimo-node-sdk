import StreamrClient from "@streamr/sdk";
import { DimoError } from "../utils/error";
import { Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

type StreamOptions = {
  streamId: string;
  clientId: string;
  privateKey: string;
  log?: string;
};

export const Stream = async ({ streamId, clientId, privateKey, log }: StreamOptions) => {
  return new Observable((observer) => {
    const client = new StreamrClient({
      logLevel: "info" || log,
      auth: {
        //this is the signer private key the developer adds
        privateKey: privateKey,
      },
    });

    const setupStream = async () => {
      try {
        const stream = await client.getStream(streamId);
        await client.subscribe(
          {
            streamId,
            erc1271Contract: clientId,
          },
          (msg) => {
            observer.next(msg);
          }
        );
      } catch (error) {
        console.error("Streamr connection failed:", error);
        observer.error(new DimoError("Streamr connection failure"));
        observer.complete();
      }
    };
    setupStream();

    return async () => {
      await client.unsubscribe(streamId);
    };
  }).pipe(
    catchError((error) => {
      console.error("Streamr subscription error:", error);
      return new Observable();
    }),
    finalize(() => {
      console.log("Cleaning up Stream listeners");
    })
  );
};
