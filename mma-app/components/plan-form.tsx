import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { planSchema, PlanFormValues } from '../lib/validation';
import { Button } from './ui/button';
import { Input } from './ui/input';

type PlanFormProps = {
  defaultValues?: PlanFormValues;
  submitLabel: string;
  onSubmit: (values: PlanFormValues) => Promise<void>;
};

export function PlanForm({ defaultValues, submitLabel, onSubmit }: PlanFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: defaultValues ?? { title: '', note: '' },
  });

  return (
    <View style={styles.form}>
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Plan title"
            value={value}
            onChangeText={onChange}
            placeholder="Week 1 Striking"
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        name="note"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Note"
            value={value}
            onChangeText={onChange}
            placeholder="Focus on movement and combinations"
            multiline
            error={errors.note?.message}
          />
        )}
      />

      <Button label={isSubmitting ? 'Saving...' : submitLabel} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
});
