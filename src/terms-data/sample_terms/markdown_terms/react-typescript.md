# React TypeScript

React with TypeScript fundamentals and patterns.

## create react app named bases using typescript template

Create the react app remember that you can use --template typescript to create the app with typescript

**Example:** ??npx create-react-app bases --template typescript??

## interface design: CounterState

interface Props {
    initialValue: number;
}

### CREATE an interface named CounterState with the following properties


export const CounterBy = ({ initialValue = 5 }: Props) => {

    const [counter, setCounter] = useState<CounterState>({        counter: initialValue,
        clicks: 0,
    });

const handleClick = (value:number ) => {
    setCounter(({clicks, counter}) => ({
        counter: counter + value,
        clicks: clicks + 1,
    }));
};

return (
    <>
    
    <h1> Counter: {counter.counter} </h1>
    <h1>Clicks: {counter.clicks}</h1>

        <button onClick={() => handleClick(1)}>+1</button>
            <button onClick={() => handleClick(2)}>+2</button>
    </>
);
};

:p Create a interface named CounterState with the following properties: counter: int and clicks as well.

**Example:** ??interface CounterState {
counter: number;
clicks: number;
}??

## defaulted class

interface Props {
    initialValue: number;
}

interface CounterState {
    counter: number;
    clicks: number;
}

### Complete with the header CounterBy exported by defaultand props with initiatedValue as 5

    const [counter, setCounter] = useState<CounterState>({        counter: initialValue,
        clicks: 0,
    });

const handleClick = (value:number ) => {
    setCounter(({clicks, counter}) => ({
        counter: counter + value,
        clicks: clicks + 1,
    }));
};

return (
    <>
    
    <h1> Counter: {counter.counter} </h1>
    <h1>Clicks: {counter.clicks}</h1>

        <button onClick={() => handleClick(1)}>+1</button>
            <button onClick={() => handleClick(2)}>+2</button>
    </>
);

**Example:** ??export const CounterBy = ({ initialValue = 5 }: Props) => {??