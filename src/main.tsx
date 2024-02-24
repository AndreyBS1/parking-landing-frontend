import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import 'dayjs/locale/ru'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'swiper/css'
import 'swiper/css/mousewheel'
import App from './App.tsx'
import { queryClient } from './api/query-client.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <DatesProvider settings={{ consistentWeeks: true, locale: 'ru' }}>
          <App />
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
