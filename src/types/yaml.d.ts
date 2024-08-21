interface Translation {
  [key: string]: string;
}

declare module '*.yaml' {
  const content: string;
  export default content;
}