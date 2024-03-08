import {useEffect, useState} from 'react'
import Header from "./ui/Header.tsx";
import Footer from './ui/Footer.tsx'

interface MessageProps {
    notification:string;
    action:string;
    talk:Array<{id:string;text:string;time:string;sendId:string;}>
}
function App() {
    const [member, setMember] = useState({
        action: 'login',
        id : "HDM001",
        name: 'terry',
    })

    const [message ,setMessage] = useState<MessageProps>({
        notification:'',
        action:'',
        talk:[],
    });

    const [newData,setNewData] = useState('')

    const getNewData = async ()=> {
        await fetch('http://localhost:4080/newData',{
            method:'get',
        }).then(async (res)=>{
            const data = await res.json();
            console.log('data',data);
            setNewData(data.message);
            console.log("getNewData",data.message);
        })
    }

    const [ws ,setWs] = useState<WebSocket | null>(null);


    useEffect(()=>{
        const newWs = new WebSocket('ws://localhost:4060')

        newWs.addEventListener('open', ()=>{
            console.log('%c Web WebSocket 已建立: ws://localhost:4060', 'color: green; font-size: 12px; font-weight:700')
            newWs.send(JSON.stringify(member));
            console.log("已傳送資料於 server")

        })

        newWs.addEventListener('message',(event)=>{
            const data = JSON.parse(event.data);
            console.log('%c Web 接收到的消息: ' + data.message, 'color: red;')
            if (data.id === member.id) {
                if (data.type === "notification") {
                    setMessage(prevState => {return{...prevState,notification: data.message}});
                }
                if (data.type === "action") {
                    getNewData();
                    setMessage(prevState => {return{...prevState,action: data.message}});
                }
                if (data.type === "talk") {

                    console.log(member.id);
                    console.log(data.sendId);
                    const today = new Date();
                    const formatDate = `${today.getHours().toString().padStart(2,"0")}:${today.getMinutes().toString().padStart(2,"0")}`
                    setMessage(prevState => {
                        return {...prevState,
                            talk: [...prevState.talk,{id:data.id,text:data.message as string,time:formatDate,sendId:data.sendId}]
                        }
                    });
                }
            }
        })
        setWs(newWs);
    },[])

    return (
        <div className="flex flex-col h-screen">
            <header>
                <Header/>
            </header>
            <main className="w-full flex justify-center flex-1">
                <div className="container w-full h-full">
                    <div className={" mt-4 w-full flex justify-center"}>
                        {`目前ID: ${member.id}`}
                    </div>
                    <div className={" mt-4 w-full flex justify-center"}>
                        {`最新消息: ${message.notification}`}
                    </div>
                    <div className={" mt-4 w-full flex justify-center"}>
                        {`最新動作: ${message.action}`}
                    </div>
                    <div className={" mt-4 w-full flex justify-center"}>
                        {`最後更新時間: ${newData}`}
                    </div>
                    <div className={" mt-4 w-full flex justify-center"}>
                        <div className={"flex flex-col w-[80%] mb-4 overflow-y-auto h-[500px] border-b-amber-200 border-2 md:w-1/2"}>
                            {message.talk.map((item)=>(
                                <div key={`${item.text}_${item.sendId}`} className={item.sendId === member.id ? "w-full flex justify-start":"w-full flex justify-end"}>
                                    <div className={item.sendId === member.id ? "flex justify-between w-1/2 mt-4 bg-amber-200 rounded-lg p-2 hover:bg-amber-300" : "rounded-lg p-2 flex justify-between w-1/2 mt-4 bg-pink-200 hover:bg-pink-300"}>
                                        <div className="w-[90%] break-all">
                                            {item.text}
                                        </div>
                                        <div className="flex items-end">
                                            <div className={"text-gray-400 hover:text-gray-600"}>
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
