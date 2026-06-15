import { useState } from "react"
import { useTranslations } from "next-intl"
import * as Form from "@radix-ui/react-form"
import { Check, X } from "lucide-react"
import { Button } from "./ui/button";

export default function ContactForm() {
  const t = useTranslations('Contact');

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const resultConfig = isSuccess
    ? {
      icon: <Check />,
      title: t('form.sendSuccess1'),
      body: t('form.sendSuccess2'),
    }
    : message?.type === 'error'
      ? {
        icon: <X />,
        title: t('form.sendError'),
        body: message?.text !== t('form.sendError') ? message?.text : '',
      }
      : null

  const handleResetView = () => {
    setIsSuccess(false)
    setMessage(null)
  }

  const showResult = !!resultConfig;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: t('form.sendError') }))
        throw new Error(errorData.error || t('form.sendError'))
      }

      const result = await response.json()
      setMessage({ type: 'success', text: result.message || t('form.sendSuccess1') })
      setIsSuccess(true)
      form.reset()

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : t('form.sendError')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1 p-6 items-center text-base-upper h-full w-full">
      <div
        className={`
          col-start-1 row-start-1 w-full text-center normal-case flex flex-col items-center justify-center 
          p-8 space-y-4 border bg-neutral-100 text-black border-neutral-200
          ${showResult ? 'opacity-100 z-10 visible' : 'opacity-0 -z-10 invisible'}
        `}
        aria-hidden={!showResult}
      >
        {resultConfig && (
          <>
            <div className="text-4xl mb-1 flex items-center justify-center">{resultConfig.icon}</div>
            <h3 className="text-base leading-tight">{resultConfig.title}</h3>
            {resultConfig.body && (
              <p className="text-sm text-neutral-800">
                {resultConfig.body}
              </p>
            )}
            <Button
              variant="outline"
              className="px-2 py-1 cursor-pointer rounded-none uppercase text-sm hover-subtle bg-white text-black"
              onClick={handleResetView}
            >
              {t('form.back')}
            </Button>
          </>
        )}
      </div>

      <Form.Root
        className={`space-y-2 w-full col-start-1 row-start-1 ${!showResult ? 'opacity-100 z-10 visible' : 'opacity-0 -z-10 invisible'}`}
        onSubmit={handleSubmit}
        aria-hidden={showResult}
      >
        <Form.Field name="name">
          <Form.Label className="contactLabel">
            {t('form.name')}
          </Form.Label>
          <Form.Control asChild>
            <input
              name="name"
              autoComplete="name"
              required
              disabled={isSubmitting}
              className="contactInput"
            />
          </Form.Control>
          <div className="contactErrorSlot">
            <Form.Message match="valueMissing" className="block">
              * {t('form.nameError')}
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Field name="email">
          <Form.Label className="contactLabel">
            Email
          </Form.Label>
          <Form.Control asChild>
            <input
              name="email"
              autoComplete="email"
              type="email"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              disabled={isSubmitting}
              className="contactInput"
            />
          </Form.Control>
          <div className="contactErrorSlot">
            <Form.Message match="valueMissing" className="block">
              * {t('form.emailError')}
            </Form.Message>
            <Form.Message match="patternMismatch" className="block">
              * {t('form.emailMismatchError')}
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Field name="message">
          <Form.Label className="contactLabel">
            {t('form.message')}
          </Form.Label>
          <Form.Control asChild>
            <textarea
              name="message"
              required
              maxLength={2000}
              disabled={isSubmitting}
              className="contactInput h-32"
            />
          </Form.Control>
          <div className="contactErrorSlot">
            <Form.Message match="valueMissing" className="block">
              * {t('form.messageError')}
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            className="w-full py-2 hover-subtle shadow-none cursor-pointer rounded-none border-input uppercase text-black text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('form.sending') : t('form.send')}
          </Button>

        </Form.Submit>
      </Form.Root>
    </div>
  )
}