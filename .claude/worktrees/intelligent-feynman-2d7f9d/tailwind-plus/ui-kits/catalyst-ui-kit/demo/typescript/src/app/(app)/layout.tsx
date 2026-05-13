import { getEvents } from '@/data'
import { ApplicationLayout } from './application-layout'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const events = await getEvents()

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>
}
