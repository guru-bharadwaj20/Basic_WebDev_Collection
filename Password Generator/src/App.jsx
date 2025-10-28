import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("lightblue")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+=-"

    const len = Number(length) || 0
    for (let i = 0; i < len; i++) {
      const idx = Math.floor(Math.random() * str.length)
      pass += str.charAt(idx)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed])
  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])
  return (
    <>
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 text-center" style={{backgroundColor: color}}>
        <h1 className="text-black text-center pt-3 font-bold text-2xl">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mg-4">

          <input type="text" value={password || ""} className='outline-none w-full py-1 px-3 bg-gray-800 m-4 mr-0 rounded border text-white' placeholder='Password' readOnly/>

          <button onClick={async () => { if (password) { try { await navigator.clipboard.writeText(password) } catch { const ta = document.createElement('textarea'); ta.value = password; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta) } }} } className="outline-none py-1 px-3 bg-black m-4 ml-0 rounded shrink-0 text-white cursor-pointer">COPY</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 my-3 text-black font-bold">
            <input type="range" min={6} max={18} value={length} className='cursor-pointer' onChange={(e) => {setLength(parseInt(e.target.value, 10))}}/>
            <label className='p-1 pl-2'>Length: {length}</label>
          </div>

          <div className="flex items-center-gap-x-1 my-auto text-black font-bold">
            <input type="checkbox" checked={numberAllowed} id="numberInput" onChange={(e) => setNumberAllowed(e.target.checked)} className='ml-3'/>
            <label htmlFor="numberInput" className='p-1'>Numbers</label>
          </div>

          <div className="flex items-center-gap-x-1 my-auto text-black font-bold">
            <input type="checkbox" checked={characterAllowed} id="characterInput" onChange={(e) => setCharacterAllowed(e.target.checked)}/>
            <label htmlFor="characterInput" className='p-1'>Characters</label>
          </div>
        </div>
      </div>
    </div>
    <div>
        <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>
          <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
            <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-black px-3 py-2 rounded-3xl">
              <button 
              onClick={() => {setColor("red")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "red"}}>Red</button>
              
              <button 
              onClick={() => {setColor("green")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "green"}}>Green</button>
              
              <button 
              onClick={() => {setColor("pink")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "pink"}}>Pink</button>
              
              <button 
              onClick={() => {setColor("yellow")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "yellow"}}>Yellow</button>
              
              <button 
              onClick={() => {setColor("orange")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "orange"}}>Orange</button>
              
              <button 
              onClick={() => {setColor("blue")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "blue"}}>Blue</button>
              
              <button 
              onClick={() => {setColor("white")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "white"}}>White</button>
              
              <button 
              onClick={() => {setColor("purple")}} className="outline-none px-4 py-1 rounded-full text-black shadow-lg font-bold" style={{backgroundColor: "purple"}}>Purple</button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
