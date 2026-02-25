import { useEffect, useState } from "react";
import { from, of, fromEvent } from "rxjs";

type UserType = {
  id: number;
  name: string;
  age: number;
};

export const Json2Observables = () => {
  const users: UserType[] = [
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 23 },
    { id: 3, name: "Charlie", age: 26 },
  ];
  const [getUsers, setGetUsers] = useState<UserType[]>([]);

  const messagePromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("promise resolved");
    }, 1000);
  });
  const message$ = from(messagePromise);

  message$.subscribe((message) => {
    console.log("message", message);
  });

  useEffect(() => {
    const users$ = of(users);

    const sub1 = users$.subscribe((users) => {
      setGetUsers((prev: UserType[]) => [...prev, ...users]);
    });

    return () => {
      sub1.unsubscribe();
    };
  }, []);

  const bodyClick$ = fromEvent(document, "click");

  bodyClick$.subscribe((event) => {
    console.log("body clicked", event);
  });

  return (
    <>
      <h1>Message: {getUsers.map((user) => user.name).join(", ")}</h1>
    </>
  );
};
