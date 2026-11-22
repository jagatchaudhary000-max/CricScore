import { Suspense, type ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, migrateDatabase } from '../db/database';
import { AppStateProvider, useInitialSettings } from '../hooks/AppState';
import { colors } from '../theme';

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

function WithSettings({ children }: { children: ReactNode }) {
  const initial = useInitialSettings();
  if (!initial) return <Loading />;
  return <AppStateProvider initial={initial}>{children}</AppStateProvider>;
}

export default function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDatabase} useSuspense>
        <WithSettings>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontWeight: '700' },
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ title: 'Welcome', headerBackVisible: false, gestureEnabled: false }} />
          </Stack>
        </WithSettings>
      </SQLiteProvider>
    </Suspense>
  );
}
