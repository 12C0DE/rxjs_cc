import { useEffect, useState } from "react";
import { from, of } from "rxjs";

export const FromAndOf = () => {
  const numbers$ = of([1, 2, 3, 4, 5]);
  const numbersFrom$ = from([1, 2, 3, 4, 5]);
  const [ofVal, setOfVal] = useState<number[]>([]);
  const [fromVal, setFromVal] = useState<number[]>([]);
  const divider = {
    backgroundColor: "white",
    height: "2px",
    width: "100%",
  };

  useEffect(() => {
    const sub1 = numbers$.subscribe((data) => {
      console.log("subscriber OF", data);
      setOfVal((prev) => [...prev, ...data]);
    });

    const sub2 = numbersFrom$.subscribe((data) => {
      console.log("subscriber FROM", data);
      setFromVal(() => [data]);
    });

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  }, []);

  return (
    <>
      <h1>numbers OF:{ofVal}</h1>
      <h1>numbers FROM:{fromVal}</h1>
      <div style={divider}></div>
    </>
  );
};
