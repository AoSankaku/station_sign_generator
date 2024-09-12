import { clientOnly } from 'vike-react/clientOnly';

const Main = clientOnly(() => import("./Main.tsx"))

export { Page }

function Page() {
  return (
    <Main />
  )
}