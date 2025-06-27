"use client"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { increment, decrement, selectCount } from "@/lib/redux/features/counter/counterSlice"
import { Button } from "@/components/ui/button"
import { useIntl } from "react-intl"

export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const intl = useIntl()

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">{intl.formatMessage({ id: "app.welcome" })}</h2>
      <p className="text-gray-500 dark:text-gray-400">{intl.formatMessage({ id: "app.description" })}</p>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => dispatch(decrement())} aria-label="Decrement">
          -
        </Button>
        <span className="text-2xl font-bold">{count}</span>
        <Button variant="outline" onClick={() => dispatch(increment())} aria-label="Increment">
          +
        </Button>
      </div>
    </div>
  )
}
