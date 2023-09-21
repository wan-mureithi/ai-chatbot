//import { type UseChatHelpers } from 'ai/react'
import { useState, useRef } from "react"
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'

// export interface ChatPanelProps
//   extends Pick<
//     UseChatHelpers,
//     | 'append'
//     | 'isLoading'
//     | 'reload'
//     | 'messages'
//     | 'stop'
//     | 'input'
//     | 'setInput'
//   > {
//   id?: string
// }
interface MessageInterface {
  message: string
  type: "request" | "response"
}

export function ChatPanel({ handleSendMessage, messages, loading, setMessage }: any) {
  //const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {loading ? (
            <Button
              variant="outline"
              //onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                //onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={handleSendMessage}
            // onSubmit={async value => {
            //   await append({
            //     id,
            //     content: value,
            //     role: 'user'
            //   })
            // }}
            input={messages}
            setInput={setMessage}
            isLoading={loading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
