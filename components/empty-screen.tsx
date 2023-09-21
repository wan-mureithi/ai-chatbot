//import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Vaccination coverage rate',
    message: `What was the vaccination coverage rate for BCG in Guinea in 2022?`,
    type: 'request'
  },
  {
    heading: 'Breakdown of PENTA 1 vaccine distribution',
    message: 'Can you provide a breakdown of PENTA 1 vaccine distribution in DSV Conakry, between 2021 - 2023?',
    type: 'request'
  },
  {
    heading: 'Emerging trends in Zero doses rates',
    message: `Are there any emerging trends or patterns in Zero doses rates across all regions in the last 2 years? `,
    type: 'request'
  }
]

export function EmptyScreen({ setInput }: any) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to VIDA Plus!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Your trusty AI assistant for staying in the loop on the latest public health vaccination data in Guinea.

        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
