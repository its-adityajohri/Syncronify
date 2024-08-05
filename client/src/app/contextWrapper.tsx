'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { AuthProvider } from '@/context/AuthContext'
import { EventProvider } from '@/context/EventContext'

export default function ContextWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <EventProvider>
        {children}
      </EventProvider>
    </AuthProvider>
)}