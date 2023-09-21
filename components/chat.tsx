'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

import { useEffect, useState } from 'react'

import useWebSocket from "react-use-websocket"


export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}
interface MessageInterface {
  message: string,
  type: "request" | "response"
}

const API_URL = "wss://vida-plus-api-3ca5e171f2a5.herokuapp.com/chat"

export function Chat({ id, className }: ChatProps) {

  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState<string>('')
  //const containerRef = useRef<HTMLDivElement>(null)
  const { sendMessage, getWebSocket } = useWebSocket(API_URL, {
    onOpen: (event) => {
      console.log("Socket open")
      setLoading(false)
    },
    onClose: (event) => {
      console.log("Socket closed")
      setLoading(true)
      setTimeout(() => {
        console.log("Openning socket")
        getWebSocket()
      }, 1000)
    },
    onMessage: (event) => {
      event.preventDefault()
      setLoading(false)
      // this fires when the event is published to a socket from backend
      // you need to unpack and add it to a chat window
      const responseMessage: MessageInterface = {
        message: event.data, // some sort of event parsing
        type: "response",
      }
      setMessages((prevMessages) => [...prevMessages, responseMessage])
    },
  })


  const handleSendMessage = async (message: string) => {
    setLoading(true)
    const inputMsg: MessageInterface = { message, type: 'request' }

    console.log(message)
    setMessages((prevMessages) => [...prevMessages, inputMsg])

    sendMessage(message)
    console.log("sending message")
  }
  console.log('all msg', messages)
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={loading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        //id={id}
        isLoading={loading}
        //stop={stop}
        //append={append}
        //reload={reload}
        handleSendMessage={handleSendMessage}
        messages={messages}
        input={input}
        setInput={setInput}
      />


    </>
  )
}
