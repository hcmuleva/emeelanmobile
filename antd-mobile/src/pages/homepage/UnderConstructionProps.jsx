"use client"

import React from "react"
import { Result, Button, Space, DotLoading, Tag } from "antd-mobile"
import { CalendarOutline, ExclamationOutline, SetOutline } from "antd-mobile-icons"
export const UnderConstruction = ({
  title = "dddPage Under ",
  description = "We're working hard to bring you something amazing. Please check back soon!",
  showTimer = true,
  estimatedCompletion = "Coming Soon",
  onBackClick,
  backText = "Go Back",
}) => {
  const [elapsedTime, setElapsedTime] = React.useState(0)

  React.useEffect(() => {
    if (showTimer) {
      const timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showTimer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-4">
    <div className="max-w-md text-center">
      <Result
        icon={
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Under Construction"
                className="h-48 w-48 animate-pulse"
              />
              <SetOutline className="absolute -right-4 -top-4 text-yellow-500" style={{ fontSize: "48px" }} />
              <ExclamationOutline className="absolute -left-4 -top-4 text-yellow-500" style={{ fontSize: "40px" }} />
            </div>
          </div>
        }
        status="waiting"
        title={
          <div className="mt-4 text-xl font-bold">
            {title} <DotLoading />
          </div>
        }
        description={
          <Space direction="vertical" className="mt-2">
            <p>{description}</p>
            {showTimer && (
              <div className="mt-2 flex justify-center">
                <Tag color="primary" className="flex items-center gap-1">
                  <CalendarOutline style={{ fontSize: "16px" }} />
                  <span>Development time: {formatTime(elapsedTime)}</span>
                </Tag>
              </div>
            )}
            <div className="mt-2">
              <Tag color="success">{estimatedCompletion}</Tag>
            </div>
          </Space>
        }
      />
      {onBackClick && (
        <div className="mt-6">
          <Button color="primary" onClick={onBackClick}>
            {backText}
          </Button>
        </div>
      )}
    </div>
  </div>
  )
}
