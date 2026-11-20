import { Text } from 'react-native';
import { Tabs } from 'expo-router/tabs';
import { colors } from '../../theme';

const icon = (glyph: string) =>
  // Emoji ignore text color, so dim the inactive tabs instead.
  function TabIcon({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{glyph}</Text>;
  };

export default function TabsLayout() {
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
      <Tabs.Screen name="index" options={{ title: 'CricScore', tabBarLabel: 'Home', tabBarIcon: icon('🏠') }} />
      <Tabs.Screen name="matches" options={{ title: 'My matches', tabBarLabel: 'Matches', tabBarIcon: icon('📋') }} />
      <Tabs.Screen name="add" options={{ title: 'Add match', tabBarLabel: 'Add', tabBarIcon: icon('➕') }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarLabel: 'Settings', tabBarIcon: icon('⚙️') }} />
    </Tabs>
  );
}
