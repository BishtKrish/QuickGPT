import React, { useEffect, useState ,useRef} from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const containerRef = useRef(null)

  const { selectedChat, theme } = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {/* Chat container */}
      <div className="flex flex-col justify-between w-full max-w-3xl h-[90vh] m-5 md:m-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        
        {/* Chats messages */}
        <div ref={containerRef} className="flex-1 mb-4 overflow-y-auto px-4 py-2">
          {messages.length === 0 && (
            <div className="h-full flex flex-col justify-center items-center gap-2 text-primary">
              <img
                src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
                alt=""
                className="w-full max-w-56 sm:max-w-68"
              />
              <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
                Ask me anything.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>

        {/* Three dots loading */}
        {loading && (
          <div className="loader flex items-center gap-1.5 px-4 pb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}

{/* only in image mode */}

    {mode === 'image' &&  (
      <label className='inline-flex items-center gap-3 mb-3 text-sm mx-auto'>
        <p className='text-xs'>Publish Generated Image to Community</p>
        <input type="checkbox" className='cursor-pointer' checked={isPublished}
        onChange={(e)=>setIsPublished(e.target.checked)}/>
      </label>
    )}


       {/* Prompt input box */}

<form
  onSubmit={onSubmit}
  className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30
  rounded-full w-full max-w-lg p-2 pl-3 flex gap-3 items-center mx-auto mb-3"
>
  <select
    onChange={(e) => setMode(e.target.value)}
    value={mode}
    className="text-sm px-2 py-1 rounded-md outline-none"
  >
    <option className="dark:bg-purple-900" value="text">text</option>
    <option className="dark:bg-purple-900" value="image">image</option>
  </select>

  <input
    onChange={(e) => setPrompt(e.target.value)}
    value={prompt}
    type="text"
    placeholder="Type your prompt here..."
    className="flex-1 w-full text-sm outline-none bg-transparent px-2"
    required
  />

  <button disabled={loading}>
    <img
      src={loading ? assets.stop_icon : assets.send_icon}
      className="w-6 cursor-pointer"
      alt=""
    />
  </button>
</form>

      </div>
    </div>
  )
}

export default ChatBox
