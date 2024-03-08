import { useState } from 'react'
import Header from "./ui/Header.tsx";
import Footer from './ui/Footer.tsx'
function App() {
  const [count, setCount] = useState(0)

  const testConnection = async ()=>{
    await fetch('http://localhost:4080/sendMessage',{
      method:'post',
      body:JSON.stringify({ id:'HDM001' ,type:"notification",message:"測試連接" }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (res)=>{
      console.log(await res.json());
    })
  }
  const testAction = async ()=>{
    await fetch('http://localhost:4080/sendMessage',{
      method:'post',
      body:JSON.stringify({ id:'HDM001' ,type:"action",message:"測試動作" }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (res)=>{
      console.log(await res.json());
    })
  }


  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header/>
      </header>
      <main className="w-full flex justify-center flex-1">
        <div className="container w-full h-full">
          <div className={" mt-4 w-full flex justify-center "}>
            <button onClick={async ()=>{
              setCount(prevState => prevState+1)
              await testConnection();
              console.log("123")
            }} className={"rounded-lg bg-blue-400 text-white py-2 px-4 font-bold hover:bg-blue-500 active:bg-blue-600"}>
              測試連接
            </button>
          </div>
          <div className={" mt-4 w-full flex justify-center"}>
            {count}
          </div>
          <div className={" mt-4 w-full flex justify-center "}>
            <button onClick={async ()=>{
              setCount(prevState => prevState+1)
              await testAction();
            }} className={"rounded-lg bg-blue-400 text-white py-2 px-4 font-bold hover:bg-blue-500 active:bg-blue-600"}>
              測試動作
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>

  )

}

export default App
