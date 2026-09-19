import React, { useEffect, useRef, useState } from "react";

const welcomeMessage = {
  role: "bot",
  text: "Hello! I’m Clyvora, your AI assistant. Ask me about college or anything else, and I’ll do my best to help.",
  timestamp: Date.now()
};

const quickActions = [
  ["Admissions", "How do I apply for admission?", "↗"],
  ["Fees", "Where can I check the fee structure?", "◈"],
  ["Exams", "When is the semester exam timetable released?", "▣"],
  ["Scholarships", "How do I apply for a scholarship?", "✦"],
  ["Placements", "How do I register for placements?", "↗"],
  ["Hostel", "What are the hostel admission requirements?", "⌂"],
  ["Library", "What are the library timings?", "▤"]
];

const collegeTopics = [
  ["Admissions", "Application steps, eligibility, documents and deadlines"],
  ["Fees", "Tuition, payments, refunds and financial information"],
  ["Exams", "Timetables, hall tickets, rules and results"],
  ["Scholarships", "Merit, need-based aid and renewal guidance"],
  ["Placements", "Internships, company drives and career support"],
  ["Hostel", "Applications, rooms, mess and residence rules"],
  ["Library", "Hours, borrowing, renewals and digital resources"]
];

const campusHighlights = [
  { label: "Admissions", value: "12 seats left", detail: "B.Tech open counselling", tone: "green" },
  { label: "Scholarships", value: "3 deadlines", detail: "Apply before Friday", tone: "blue" },
  { label: "Hostel", value: "18 rooms free", detail: "Girls wing available", tone: "amber" },
  { label: "Placements", value: "2 drives today", detail: "Infosys + TCS", tone: "violet" }
];

const iconMap = {
  search: "⌕", bell: "♢", menu: "☰", plus: "+", send: "↑", attach: "⌕", mic: "◉",
  copy: "▣", like: "♧", dislike: "♤", refresh: "↻", sun: "☼", moon: "◐", close: "×"
};

function Icon({ name }) {
  return <span className={`icon icon-${name}`} aria-hidden="true">{iconMap[name] || "•"}</span>;
}

function createChat() {
  return {
    id: `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: "New conversation",
    updatedAt: Date.now(),
    messages: [welcomeMessage]
  };
}

function loadChats() {
  try {
    const savedChats = JSON.parse(localStorage.getItem("college-chat-chats"));
    return Array.isArray(savedChats) && savedChats.length ? savedChats : [createChat()];
  } catch {
    return [createChat()];
  }
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(timestamp || Date.now());
}

function MessageActions({ message, onCopy, onFeedback, onRegenerate }) {
  if (message.role !== "bot") return null;

  return (
    <div className="message-actions">
      <button onClick={() => onCopy(message.text)} aria-label="Copy response" title="Copy response"><Icon name="copy" /></button>
      <button className={message.feedback === "like" ? "selected" : ""} onClick={() => onFeedback(message, "like")} aria-label="Like response" title="Helpful"><Icon name="like" /></button>
      <button className={message.feedback === "dislike" ? "selected" : ""} onClick={() => onFeedback(message, "dislike")} aria-label="Dislike response" title="Not helpful"><Icon name="dislike" /></button>
      <button onClick={() => onRegenerate(message)} aria-label="Regenerate response" title="Regenerate"><Icon name="refresh" /></button>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;
    onLogin({ name: email.split("@")[0] || "Student", email });
  }

  return (
    <main className="login-shell">
      <section className="login-art" aria-label="Clyvora student support">
        <div className="login-art-top"><div className="brand-mark">✦</div><strong>Clyvora</strong></div>
        <div className="login-art-copy"><p className="eyebrow">YOUR QUESTIONS, CONNECTED</p><h1>One thoughtful assistant for whatever comes next.</h1><p>Find answers, explore ideas, and stay close to the support you need from one helpful desk.</p></div>
        <div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" /><div className="login-stat"><span className="status-dot" /><div><strong>Student support online</strong><small>Ready when you are</small></div></div>
      </section>
      <section className="login-panel">
        <div className="login-panel-inner">
          <div className="mobile-login-brand"><div className="brand-mark">✦</div><strong>Clyvora</strong></div>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to your desk.</h2>
          <p className="login-subtitle">Sign in to continue to your personal AI support space.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="student-email">Email address</label>
            <input id="student-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@college.edu" autoComplete="email" required />
            <div className="password-label"><label htmlFor="student-password">Password</label><button type="button" onClick={() => setShowPassword(previous => !previous)}>{showPassword ? "Hide" : "Show"}</button></div>
            <input id="student-password" type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
            <div className="login-options"><label><input type="checkbox" /> <span>Remember me</span></label><button type="button" onClick={() => window.alert("Please contact your account administrator to reset your password.")}>Forgot password?</button></div>
            <button className="login-submit" type="submit">Sign in <span>→</span></button>
          </form>
          <p className="login-note">By continuing, you agree to the acceptable use policy.</p>
          <div className="login-help"><span>New to Clyvora?</span><button type="button" onClick={() => setEmail("student@college.edu")}>Use demo account</button></div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("clyvora-user")) || null;
    } catch {
      return null;
    }
  });
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(() => loadChats()[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("clyvora-theme") !== "light");
  const [toast, setToast] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  const activeChat = chats.find(chat => chat.id === activeChatId) || chats[0];
  const filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredTopics = collegeTopics.filter(([title, description]) => `${title} ${description}`.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleLogin(nextUser) {
    setUser(nextUser);
    localStorage.setItem("clyvora-user", JSON.stringify(nextUser));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("clyvora-user");
    setNotificationsOpen(false);
    setMobileSidebarOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("college-chat-chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("clyvora-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleShortcut = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        window.setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!user) return <LoginPage onLogin={handleLogin} />;

  function updateChat(chatId, changes) {
    setChats(previousChats => previousChats.map(chat => (
      chat.id === chatId ? { ...chat, ...changes, updatedAt: Date.now() } : chat
    )));
  }

  function startNewChat() {
    const newChat = createChat();
    setChats(previousChats => [newChat, ...previousChats]);
    setActiveChatId(newChat.id);
    setInput("");
    setMobileSidebarOpen(false);
  }

  function deleteChat(chatId) {
    setChats(previousChats => {
      const remainingChats = previousChats.filter(chat => chat.id !== chatId);
      if (!remainingChats.length) {
        const newChat = createChat();
        setActiveChatId(newChat.id);
        return [newChat];
      }
      if (chatId === activeChatId) setActiveChatId(remainingChats[0].id);
      return remainingChats;
    });
    setToast("Conversation deleted");
  }

  async function requestAnswer(question, messagesBeforeAnswer) {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });
    const data = await response.json();
    return [...messagesBeforeAnswer, { role: "bot", text: data.answer || "Sorry, something went wrong.", timestamp: Date.now() }];
  }

  async function sendMessage(event) {
    event?.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    const userMessage = { role: "user", text: question, timestamp: Date.now() };
    const nextMessages = [...activeChat.messages, userMessage];
    const title = activeChat.title === "New conversation" ? question.slice(0, 34) + (question.length > 34 ? "..." : "") : activeChat.title;
    updateChat(activeChat.id, { title, messages: nextMessages });
    setInput("");
    setLoading(true);
    try {
      updateChat(activeChat.id, { messages: await requestAnswer(question, nextMessages) });
    } catch {
      updateChat(activeChat.id, { messages: [...nextMessages, { role: "bot", text: "I could not connect to the assistant. Please check that the backend is running and try again.", timestamp: Date.now(), error: true }] });
      setToast("Assistant connection failed");
    } finally {
      setLoading(false);
    }
  }

  async function regenerateResponse(message) {
    const messageIndex = activeChat.messages.indexOf(message);
    const previousUserMessage = [...activeChat.messages.slice(0, messageIndex)].reverse().find(item => item.role === "user");
    if (!previousUserMessage || loading) return;
    setLoading(true);
    try {
      const messagesBeforeAnswer = activeChat.messages.slice(0, messageIndex);
      updateChat(activeChat.id, { messages: await requestAnswer(previousUserMessage.text, messagesBeforeAnswer) });
      setToast("Response regenerated");
    } catch {
      setToast("Could not regenerate response");
    } finally {
      setLoading(false);
    }
  }

  function setFeedback(message, feedback) {
    updateChat(activeChat.id, { messages: activeChat.messages.map(item => item === message ? { ...item, feedback: item.feedback === feedback ? null : feedback } : item) });
  }

  async function copyResponse(text) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Response copied");
    } catch {
      setToast("Copy is unavailable in this browser");
    }
  }

  function selectSearchTopic(question) {
    setInput(question);
    setSearchOpen(false);
    setSearchTerm("");
  }

  function handleAttachment(event) {
    const file = event.target.files?.[0];
    if (file) setToast(`${file.name} attached for review`);
    event.target.value = "";
  }

  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setToast("Voice input is not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = event => setInput(previous => `${previous} ${event.results[0][0].transcript}`.trim());
    recognition.start();
    setToast("Listening...");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileSidebarOpen ? "mobile-open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="brand"><div className="brand-mark">✦</div><div className="brand-copy"><strong>Clyvora</strong><span>Student support desk</span></div><button className="mobile-close" onClick={() => setMobileSidebarOpen(false)} aria-label="Close menu"><Icon name="close" /></button><button className="collapse-button" onClick={() => setSidebarCollapsed(previous => !previous)} aria-label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"} title={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"}>‹</button></div>
        <button className="new-chat-button" onClick={startNewChat}><Icon name="plus" /> New chat</button>
        <button className="sidebar-search" onClick={() => setSearchOpen(true)}><Icon name="search" /><span>Search conversations</span><kbd>⌘ K</kbd></button>
        <div className="history-heading"><span>Recent chats</span><span className="chat-count">{chats.length}</span></div>
        <nav className="chat-history" aria-label="Previous chats">
          {filteredChats.map(chat => (
            <div key={chat.id} className={`history-item ${chat.id === activeChat.id ? "active" : ""}`}>
              <button className="history-select" onClick={() => { setActiveChatId(chat.id); setMobileSidebarOpen(false); }}><span className="history-icon">◌</span><span className="history-title">{chat.title}</span></button>
              <button className="delete-chat-button" onClick={() => deleteChat(chat.id)} aria-label={`Delete ${chat.title}`} title="Delete chat">×</button>
            </div>
          ))}
          {!filteredChats.length && <p className="empty-history">No matching conversations</p>}
        </nav>
        <div className="sidebar-footer"><div className="status-dot" /><div><strong>Assistant online</strong><span>Ready to help</span></div></div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          <div><p className="eyebrow">AI HELP DESK</p><h1>{activeChat.title}</h1></div>
          <div className="topbar-actions"><button className="icon-button notification-button" onClick={() => setNotificationsOpen(previous => !previous)} aria-label="Notifications"><Icon name="bell" /><span className="notification-dot" /></button><button className="theme-button" onClick={() => setDarkMode(previous => !previous)} aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}><Icon name={darkMode ? "sun" : "moon"} /><span>{darkMode ? "Light" : "Dark"}</span></button><div className="topbar-badge"><span /> AI assistant</div><button className="profile-chip" onClick={handleLogout} title="Sign out"><div className="profile-avatar">{user.name.slice(0, 2).toUpperCase()}</div><div><strong>{user.name}</strong><span>Sign out</span></div></button></div>
          {notificationsOpen && <div className="notification-popover"><strong>Notifications</strong><p>You're all caught up. New college notices will appear here.</p></div>}
        </header>

        <section className="chat-panel">
          <div className="conversation" aria-live="polite">
            {activeChat.messages.length === 1 && !loading && (
              <>
                <div className="welcome-copy">
                  <div className="welcome-icon">✦</div>
                  <p className="welcome-kicker">YOUR CAMPUS COMPANION</p>
                  <h2>What can I help you find?</h2>
                  <p>Ask about college, work, learning, planning, or anything on your mind.</p>
                </div>

                <div className="insight-grid">
                  {campusHighlights.map((item) => (
                    <div key={item.label} className={`insight-card ${item.tone}`}>
                      <div className="insight-header">
                        <span>{item.label}</span>
                        <b>•</b>
                      </div>
                      <strong>{item.value}</strong>
                      <small>{item.detail}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeChat.messages.map((message, index) => (
              <div key={`${activeChat.id}-${index}`} className={`message ${message.role} ${message.error ? "message-error" : ""}`}><div className="avatar">{message.role === "bot" ? "✦" : "You"}</div><div className="message-content"><div className="message-meta"><span className="message-author">{message.role === "bot" ? "Clyvora" : "You"}</span><time>{formatTime(message.timestamp)}</time></div><p>{message.text}</p><MessageActions message={message} onCopy={copyResponse} onFeedback={setFeedback} onRegenerate={regenerateResponse} /></div></div>
            ))}
            {activeChat.messages.length === 1 && !loading && <div className="suggestions"><span>Try asking</span>{quickActions.slice(0, 4).map(([label, question]) => <button key={label} onClick={() => setInput(question)}>{label}</button>)}</div>}
            {loading && <div className="message bot"><div className="avatar">✦</div><div className="message-content"><div className="message-meta"><span className="message-author">Clyvora</span><time>now</time></div><div className="typing-indicator"><i /><i /><i /></div></div></div>}
          </div>

          <div className="quick-actions"><span>Explore</span>{quickActions.map(([label, question, symbol]) => <button key={label} onClick={() => setInput(question)}><b>{symbol}</b>{label}</button>)}</div>
          <form onSubmit={sendMessage} className="input-area"><input ref={fileInputRef} className="file-input" type="file" onChange={handleAttachment} /><button type="button" className="input-tool" onClick={() => fileInputRef.current?.click()} aria-label="Attach file" title="Attach file"><Icon name="attach" /></button><input className="chat-input" value={input} onChange={event => setInput(event.target.value)} placeholder="Message Clyvora..." aria-label="Ask the college assistant" /><button type="button" className="input-tool voice-button" onClick={startVoiceInput} aria-label="Use voice input" title="Voice input"><Icon name="mic" /></button><button type="submit" className="send-button" disabled={loading || !input.trim()} aria-label="Send message"><Icon name="send" /></button></form>
          <p className="input-note">Clyvora can make mistakes. Verify important information with a trusted source.</p>
        </section>
      </main>

      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search college information" onClick={event => event.target === event.currentTarget && setSearchOpen(false)}><div className="search-modal"><div className="search-modal-header"><div className="search-field"><Icon name="search" /><input ref={searchInputRef} autoFocus value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search chats or college information..." /><kbd>ESC</kbd></div><button onClick={() => setSearchOpen(false)} aria-label="Close search"><Icon name="close" /></button></div><div className="search-results">{searchTerm && <><p className="result-label">Conversations</p>{filteredChats.map(chat => <button className="search-result" key={chat.id} onClick={() => { setActiveChatId(chat.id); setSearchOpen(false); }}><span>◌</span><div><strong>{chat.title}</strong><small>{chat.messages.length} messages</small></div></button>)}</>}{filteredTopics.length > 0 && <><p className="result-label">College information</p>{filteredTopics.map(([title, description]) => <button className="search-result" key={title} onClick={() => selectSearchTopic(`Tell me about ${title.toLowerCase()}`)}><span>✦</span><div><strong>{title}</strong><small>{description}</small></div><b>›</b></button>)}</>}{searchTerm && !filteredChats.length && !filteredTopics.length && <div className="empty-state"><span>⌕</span><strong>No results found</strong><p>Try a different topic or ask Clyvora directly.</p></div>}</div></div></div>}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </div>
  );
}
