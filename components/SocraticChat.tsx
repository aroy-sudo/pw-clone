"use client"

import { useChat } from "@ai-sdk/react"
import { useRef, useEffect, useState, useCallback } from "react"
import { isTextUIPart, type UIMessage } from "ai"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { cn } from "@/lib/utils"
import "katex/dist/katex.min.css"

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("\n")
}

export function SocraticChat() {
  const { messages, sendMessage, status } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        setImagePreview(dataUrl)
      }
      reader.readAsDataURL(file)
    },
    []
  )

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!inputValue.trim() && !imagePreview) return

      const text = inputValue.trim() || "Please analyze this image and guide me through solving it."

      if (imagePreview) {
        sendMessage({
          text,
          files: [
            {
              type: "file",
              mediaType: "image/png",
              url: imagePreview,
            },
          ],
        })
        setImagePreview(null)
      } else {
        sendMessage({ text })
      }

      setInputValue("")
    },
    [inputValue, imagePreview, sendMessage]
  )

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col rounded-2xl border bg-card shadow-sm">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Ask me anything</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                I&apos;ll guide you to the answer using the Socratic method — no
                spoon-feeding! You can also upload images of problems.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                S
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {/* Render file parts (images) */}
              {message.parts
                .filter((part): part is { type: "file"; mediaType: string; url: string } => part.type === "file" && "url" in part)
                .map((part, i) => (
                  <img
                    key={i}
                    src={part.url}
                    alt="Uploaded"
                    className="mb-2 max-h-48 rounded-lg"
                  />
                ))}
              {/* Render text parts */}
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {getMessageText(message)}
              </ReactMarkdown>
            </div>
            {message.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                U
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
              S
            </div>
            <div className="rounded-2xl bg-muted px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div className="border-t px-4 py-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 rounded-lg border"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t p-4"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
          title="Upload image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </button>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a JEE/NEET question…"
          className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring focus:ring-2 transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!inputValue.trim() && !imagePreview)}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all",
            isLoading || (!inputValue.trim() && !imagePreview)
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 active:scale-95"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </button>
      </form>
    </div>
  )
}
