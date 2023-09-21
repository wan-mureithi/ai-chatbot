'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import useWebSocket from "react-use-websocket"

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}
interface MessageInterface {
  message: string
  type: "request" | "response"
}

const API_URL = "wss://vida-plus-api-3ca5e171f2a5.herokuapp.com/chat"

export function Chat({ id, className }: ChatProps) {
  //const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  //const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  // const { messages, append, reload, stop, isLoading, input, setInput } =
  // useChat({
  //   initialMessages, 
  //   id,
  //   body: {
  //     id,
  //     previewToken
  //   },
  //   onResponse(response) {
  //     if (response.status === 401) {
  //       toast.error(response.statusText)
  //     }
  //   }
  // })
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState<any>({})
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
  const handleSendMessage = async (message: MessageInterface) => {
    console.log(message)
    setMessages((prevMessages) => [...prevMessages, message])
    setLoading(true)
    sendMessage(message.message)
    console.log("sending message")
  }
  console.log(messages)
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
        id={id}
        isLoading={loading}
        stop={stop}
        //append={append}
        //reload={reload}
        messages={messages}
        input={message}
        setInput={setInput}
      />

      {/* <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  )
}
