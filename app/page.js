'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [status, setStatus] = useState('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')

      if (error) {
        setStatus('❌ Connection failed: ' + error.message)
      } else {
        setStatus('✅ Supabase connected! Tables ready.')
      }
    }
    testConnection()
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      fontSize: '24px'
    }}>
      {status}
    </div>
  )
}
