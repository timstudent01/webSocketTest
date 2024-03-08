import {useEffect, useState} from 'react'
import Header from "./ui/Header.tsx";
import Footer from './ui/Footer.tsx'
function App() {
    const [member, setMember] = useState({
        action: 'login',
        id : "HDM001",
        name: 'terry',
    })
    const [message ,setMessage] = useState({
        notification:'',
        action:'',
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
            console.log('%c Web WebSocket 已建立: ws://localhost:4060', 'color: green;')
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
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>

    )

}

export default App
