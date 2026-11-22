import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { useAppState } from '../../hooks/AppState';
import { colors } from '../../theme';

const icon = (glyph: string) =>
  // Emoji ignore text color, so dim the inactive tabs instead.
  function TabIcon({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{glyph}</Text>;
  };

export default function TabsLayout() {
  const { settings } = useAppState();
  if (!settings.onboarded) return <Redirect href="/onboarding" />;
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: icon('💧') }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: icon('📊') }} />
      <Tabs.Screen name="reminders" options={{ title: 'Reminders', tabBarIcon: icon('⏰') }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('⚙️') }} />
    </Tabs>
  );
}
