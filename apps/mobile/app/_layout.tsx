import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#161B22' },
          headerTintColor: '#D4A853',
          headerTitleStyle: { fontWeight: 'bold', color: '#E6EDF3' },
          contentStyle: { backgroundColor: '#0D1117' },
        }}
      />
    </>
  )
}
