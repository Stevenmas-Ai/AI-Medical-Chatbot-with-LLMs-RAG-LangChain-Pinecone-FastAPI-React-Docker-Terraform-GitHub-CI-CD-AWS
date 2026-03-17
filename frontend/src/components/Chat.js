import { useRef, useEffect } from "react"

function Chat({ messages, loading, input, setInput, sendMessage }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            ...styles.messageRow,
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            {msg.role === "bot" && <div style={styles.botAvatar}>🤖</div>}
            <div style={{
              ...styles.bubble,
              ...(msg.role === "user" ? styles.userBubble : styles.botBubble)
            }}>
              <div>{msg.text}</div>
              <div style={styles.time}>
                {msg.time}
                {msg.provider && (
                  <span style={styles.badge}>
                    {msg.provider === "groq" ? " • Groq" : " • OpenAI"}
                  </span>
                )}
              </div>
            </div>
            {msg.role === "user" && <div style={styles.userAvatar}>👤</div>}
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
            <div style={styles.botAvatar}>🤖</div>
            <div style={{ ...styles.bubble, ...styles.botBubble }}>
              <div style={styles.typing}>
                <span>●</span><span>●</span><span>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          style={{
            ...styles.sendBtn,
            opacity: loading || !input.trim() ? 0.5 : 1,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer"
          }}
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </div>
    </>
  )
}

const styles = {
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px"
  },
  botAvatar: { fontSize: "24px", marginBottom: "4px" },
  userAvatar: { fontSize: "24px", marginBottom: "4px" },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "18px",
    fontSize: "14px",
    lineHeight: "1.5"
  },
  userBubble: {
    backgroundColor: "#0f3460",
    color: "white",
    borderBottomRightRadius: "4px"
  },
  botBubble: {
    backgroundColor: "#1a1a2e",
    color: "#e0e0e0",
    borderBottomLeftRadius: "4px",
    border: "1px solid #0f3460"
  },
  time: { fontSize: "10px", color: "#a0b4d6", marginTop: "4px" },
  badge: { color: "#4a9eff" },
  typing: { display: "flex", gap: "4px", fontSize: "20px", color: "#4a9eff" },
  inputArea: {
    padding: "15px 20px",
    backgroundColor: "#0f3460",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  input: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    border: "none",
    borderRadius: "25px",
    padding: "12px 18px",
    color: "white",
    fontSize: "14px",
    outline: "none"
  },
  sendBtn: {
    backgroundColor: "#4a9eff",
    border: "none",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}

export default Chat