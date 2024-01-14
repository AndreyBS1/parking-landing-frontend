import { AppShell, Burger, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import clsx from 'clsx'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AdminLinks } from '../constants/links.constant'
import { useAuthStore } from '../stores/use-auth-store.hook'

export default function DashboardPage() {
  const navigate = useNavigate()
  const accessToken = useAuthStore((store) => store.accessToken)
  const [opened, { toggle }] = useDisclosure()

  if (!accessToken) {
    navigate('/admin/auth')
    return null
  }

  return (
    <AppShell
      header={{ height: '5rem' }}
      navbar={{
        width: '20rem',
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src="/images/logo.png" alt="" className="w-10" />
          <p className="text-lg font-semibold">Административная панель</p>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          {AdminLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                clsx(
                  'p-2 rounded-md border border-gray hover:border-black transition-colors',
                  isActive && 'text-white border-black bg-black'
                )
              }
            >
              {link.title}
            </NavLink>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
