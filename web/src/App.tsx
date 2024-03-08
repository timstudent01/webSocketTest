import {useRef, useState} from 'react'
import Header from "./ui/Header.tsx";
import Footer from './ui/Footer.tsx'
function App() {
  const [count, setCount] = useState(0)
  const formRef = useRef<HTMLFormElement>(null);
  const formRef2 = useRef<HTMLFormElement>(null);

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

  const talkAction = async (text:string)=>{
    await fetch('http://localhost:4080/sendMessage',{
      method:'post',
      body:JSON.stringify({ id:'HDM001' ,type:"talk",message:text , sendId:'HDM002'}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (res)=>{
      console.log(await res.json());
    })
  }
  const talkAction2 = async (text:string)=>{
    await fetch('http://localhost:4080/sendMessage',{
      method:'post',
      body:JSON.stringify({ id:'HDM001' ,type:"talk",message:text , sendId:'HDM001'}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (res)=>{
      console.log(await res.json());
    })
  }

  const handleForm = async (data:FormData) => {
      const formData:Record<string, any> = Object.fromEntries(data);
      console.log(formData);
      setCount(prevState => prevState+1)
      await talkAction(formData.text);
      if (formRef) {
        formRef.current?.reset();
      }
  }
  const handleForm2 = async (data:FormData) => {
    const formData:Record<string, any> = Object.fromEntries(data);
    console.log(formData);
    setCount(prevState => prevState+1)
    await talkAction2(formData.text);
    if (formRef2) {
      formRef2.current?.reset();
    }
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
          <div className={" mt-4 w-full flex justify-center items-center"}>
            <form className="w-full flex justify-center" ref={formRef} onSubmit={async (e)=>{
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleForm(formData);
            }}>
              <input className={" rounded-lg p-4 border-grey-400 border-2"} name="text" defaultValue={""} placeholder={"講些話吧"}/>
              <div className={"ml-4 flex  items-center"}>
                <button type="submit" className={"rounded-lg bg-pink-300 text-white py-2 px-4 font-bold hover:bg-pink-400 active:bg-pink-500"}>
                  送出訊息
                </button>
              </div>
            </form>
          </div>
          <div className={" mt-4 w-full flex justify-center items-center"}>
            <form className="w-full flex justify-center" ref={formRef2} onSubmit={async (e)=>{
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleForm2(formData);
            }}>
              <input className={" rounded-lg p-4 border-grey-400 border-2"} name="text" defaultValue={""} placeholder={"講些話吧"}/>
              <div className={"ml-4 flex  items-center"}>
                <button type="submit" className={"rounded-lg bg-amber-400 text-white py-2 px-4 font-bold hover:bg-amber-500 active:bg-amber-600"}>
                  送出訊息2
                </button>
              </div>
            </form>
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
