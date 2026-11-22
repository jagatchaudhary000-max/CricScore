import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

const WIDTH = 170;
const HEIGHT = 230;

/** A glass that fills up with today's progress (0..1+), with the percentage in the middle. */
export function WaterGlass({ progress, label }: { progress: number; label: string }) {
  const level = useRef(new Animated.Value(0)).current;
  const clamped = Math.min(1, Math.max(0, progress));

  useEffect(() => {
    Animated.timing(level, {
      toValue: clamped,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [clamped, level]);

  const height = level.interpolate({ inputRange: [0, 1], outputRange: [0, HEIGHT] });
  const pct = Math.round(progress * 100);

  return (
    <View style={styles.wrap} accessible accessibilityLabel={`${pct}% of daily goal. ${label}`}>
      <View style={styles.glass}>
        <Animated.View style={[styles.water, { height }]}>
          <View style={styles.surface} />
        </Animated.View>
        <View style={styles.center} pointerEvents="none">
          <Text style={[styles.pct, clamped > 0.8 && styles.onWater]}>{pct}%</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  glass: {
    width: WIDTH,
    height: HEIGHT,
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: '#B9D7F2',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: '#FAFDFF',
  },
  water: { width: '100%', backgroundColor: colors.water },
  surface: { height: 10, backgroundColor: '#8FD0FA', opacity: 0.9 },
  center: { position: 'absolute', top: 36, right: 0, left: 0, alignItems: 'center' },
  pct: { fontSize: 40, fontWeight: '800', color: colors.primaryDark, fontVariant: ['tabular-nums'] },
  label: { fontSize: 18, color: colors.text, marginTop: 12, fontWeight: '700', fontVariant: ['tabular-nums'] },
  onWater: { color: '#FFFFFF' },
});
