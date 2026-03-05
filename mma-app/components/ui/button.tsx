import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, variantStyles[variant], disabled && styles.disabled]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: '#0284c7' },
  secondary: { backgroundColor: '#334155' },
  danger: { backgroundColor: '#be123c' },
});

const styles = StyleSheet.create({
  base: {
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
