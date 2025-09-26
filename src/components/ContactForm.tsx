'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import * as Form from "@radix-ui/react-form"

export default function ContactForm() {
  const t = useTranslations('HomePage');
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

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

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Message sent successfully!')
        event.currentTarget.reset()
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Failed to send message.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-row justify-between px-6 py-4 items-center leading-tight tracking-tight uppercase text-base h-full">
      <Form.Root className="space-y-6 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
        <Form.Field name="name" className="w-full mb-4">
          <Form.Label className="block text-sm font-semibold text-black">
            {t('sections.contact.form.name')}
          </Form.Label>
          <Form.Control asChild>
            <input
              name="name"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border-1 border-[#e5e5e5] px-3 py-2 text-black focus:outline-none focus:border-black resize-none text-sm disabled:opacity-50"
            />
          </Form.Control>
          <Form.Message match="valueMissing" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.nameError')}
          </Form.Message>
        </Form.Field>

        <Form.Field name="email" className="w-full mb-4">
          <Form.Label className="block text-sm font-semibold text-black">
            Email
          </Form.Label>
          <Form.Control asChild>
            <input
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border-1 border-[#e5e5e5] px-3 py-2 text-black focus:outline-none focus:border-black resize-none text-sm disabled:opacity-50"
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
              disabled={isSubmitting}
              className="mt-1 w-full border-1 border-[#e5e5e5] px-3 py-2 text-black focus:outline-none focus:border-black resize-none h-32 text-sm disabled:opacity-50"
            />
          </Form.Control>
          <Form.Message match="valueMissing" className="mt-1 text-xs text-red-600">
            * {t('sections.contact.form.messageError')}
          </Form.Message>
        </Form.Field>

        {submitStatus !== 'idle' && (
          <div className={`text-sm p-3 rounded ${
            submitStatus === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}

        <Form.Submit asChild>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 cursor-pointer hover:bg-neutral-200 hover:border-black hover:underline transition-all duration-300 border-1 border-[#e5e5e5] text-black text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SENDING...' : t('sections.contact.form.send')}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}