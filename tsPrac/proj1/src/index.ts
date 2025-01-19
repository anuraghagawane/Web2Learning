type Users = Record<string, {age: number; name: string}>

type EventType = 'click' | 'scroll' | 'mousemove';

type ExcludeEvent = Exclude<EventType, 'scroll'>;

const users: Users = {
    "name": {age: 21, name: "harikrat"},
}