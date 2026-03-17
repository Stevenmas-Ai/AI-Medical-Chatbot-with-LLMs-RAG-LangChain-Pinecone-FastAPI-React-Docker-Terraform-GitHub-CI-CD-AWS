function Header({ provider, setProvider }) {
  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <div style={styles.avatar}>🏥</div>
        <div>
          <div style={styles.title}>Medical Chatbot</div>
          <div style={styles.subtitle}>Ask me anything!</div>
        </div>
      </div>
      <div style={styles.providerContainer}>
        <label style={styles.label}>LLM:</label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          style={styles.select}
        >
          <option value="groq">🆓 Groq (LLaMA)</option>
          <option value="openai">⚡ OpenAI GPT-4o</option>
        </select>
      </div>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: "#0f3460",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  avatar: {
    fontSize: "32px"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px"
  },
  subtitle: {
    color: "#a0b4d6",
    fontSize: "12px"
  },
  providerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  label: {
    color: "#a0b4d6",
    fontSize: "12px"
  },
  select: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "1px solid #4a9eff",
    borderRadius: "8px",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer"
  }
}

export default Header