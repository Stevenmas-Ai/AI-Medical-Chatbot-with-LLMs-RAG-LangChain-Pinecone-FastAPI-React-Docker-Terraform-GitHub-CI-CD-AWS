import { useState } from "react"
import axios from "axios"
import Chat from "./components/Chat"
import Header from "./components/Header"

const API_URL = "http://3.89.39.140:8000"

function App() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm your Medical Assistant. Ask me anything about medical conditions, symptoms, or treatments.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ])
  const [input, setInput] = useState("")
  const [provider, setProvider] = useState("groq")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: input,
        provider: provider
      })

      setMessages(prev => [...prev, {
        role: "bot",
        text: response.data.answer,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        provider: response.data.provider
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "bot",
        text: "Sorry, something went wrong. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <Header provider={provider} setProvider={setProvider} />
        <Chat
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a2e",
    fontFamily: "'Segoe UI', sans-serif"
  },
  chatBox: {
    width: "450px",
    height: "680px",
    backgroundColor: "#16213e",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  }
}

export default App