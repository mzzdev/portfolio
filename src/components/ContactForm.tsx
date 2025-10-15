import { useState } from "react"
import { useTranslations } from "next-intl"
import * as Form from "@radix-ui/react-form"
import { Check } from "lucide-react"

export default function ContactForm() {
  const t = useTranslations('Home');
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
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
        const errorData = await response.json().catch(() => ({ error: t('sections.contact.form.sendError') }))
        throw new Error(errorData.error || t('sections.contact.form.sendError'))
      }

      const result = await response.json()
      setMessage({ type: 'success', text: result.message || t('sections.contact.form.sendSuccess1') })
      setIsSuccess(true)
      
      const form = event.currentTarget
      if (form) {
        form.reset()
      }

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : t('sections.contact.form.sendError')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-row justify-between px-6 py-4 items-center text-base-upper h-full">
      {isSuccess ? (
        <div className="w-full">
          <div className="bg-neutral-100 text-black border border-neutral-200 p-8 text-center normal-case space-y-4">
            <div className="text-4xl mb-4 flex items-center justify-center"><Check /></div>
            <h3 className="text-lg">{t('sections.contact.form.sendSuccess1')}</h3>
            <p className="text-sm text-neutral-800">
              {t('sections.contact.form.sendSuccess2')}
            </p>
          </div>
        </div>
      ) : (
        <Form.Root className="space-y-6 w-full" onSubmit={handleSubmit}>
        <Form.Field name="name" className="w-full mb-4">
          <Form.Label className="block text-sm text-black">
            {t('sections.contact.form.name')}
          </Form.Label>
          <Form.Control asChild>
            <input
              name="name"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border-input px-3 py-2 text-black focus:outline-none focus:border-black resize-none text-sm disabled:opacity-50"
            />
          </Form.Control>
          <Form.Message match="valueMissing" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.nameError')}
          </Form.Message>
        </Form.Field>

        <Form.Field name="email" className="w-full mb-4">
          <Form.Label className="block text-sm text-black">
            Email
          </Form.Label>
          <Form.Control asChild>
            <input
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border-input px-3 py-2 text-black focus:outline-none focus:border-black resize-none text-sm disabled:opacity-50"
            />
          </Form.Control>
          <Form.Message match="valueMissing" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.emailError')}
          </Form.Message>
          <Form.Message match="typeMismatch" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.emailMismatchError')}
          </Form.Message>
        </Form.Field>

        <Form.Field name="message" className="w-full">
          <Form.Label className="block text-sm text-black">
            {t('sections.contact.form.message')}
          </Form.Label>
          <Form.Control asChild>
            <textarea
              name="message"
              required
              maxLength={2000}
              disabled={isSubmitting}
              className="mt-1 w-full border-input px-3 py-2 text-black focus:outline-none focus:border-black resize-none h-32 text-sm disabled:opacity-50"
            />
          </Form.Control>
          <Form.Message match="valueMissing" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.messageError')}
          </Form.Message>
        </Form.Field>

        {message && message.type === 'error' && (
          <div className="text-sm p-3 rounded bg-red-50 text-red-800 border border-red-200">
            {message.text}
          </div>
        )}

        <Form.Submit asChild>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 cursor-pointer hover-subtle border-input text-black text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('sections.contact.form.sending') : t('sections.contact.form.send')}
          </button>
        </Form.Submit>
      </Form.Root>
      )}
    </div>
  )
}