import { UsernameEntry } from "../UsernameEntry"

export default function UsernameEntryExample() {
  return (
    <UsernameEntry 
      open={true} 
      onUsernameSet={(username) => console.log('Username set:', username)} 
    />
  )
}