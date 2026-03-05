import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { exerciseSchema, ExerciseFormValues } from '../lib/validation';
import { Button } from './ui/button';
import { Input } from './ui/input';

type ExerciseFormProps = {
  onSubmit: (values: ExerciseFormValues) => Promise<void>;
};

export function ExerciseForm({ onSubmit }: ExerciseFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { name: '', reps: 10, sets: 3 },
  });

  async function submit(values: ExerciseFormValues) {
    await onSubmit(values);
    reset({ name: '', reps: 10, sets: 3 });
  }

  return (
    <View style={styles.form}>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Exercise name"
            value={value}
            onChangeText={onChange}
            placeholder="Jab-cross combo"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="reps"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Reps"
            value={String(value)}
            onChangeText={onChange}
            keyboardType="numeric"
            error={errors.reps?.message}
          />
        )}
      />

      <Controller
        name="sets"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Sets"
            value={String(value)}
            onChangeText={onChange}
            keyboardType="numeric"
            error={errors.sets?.message}
          />
        )}
      />

      <Button label={isSubmitting ? 'Adding...' : 'Add Exercise'} onPress={handleSubmit(submit)} disabled={isSubmitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
});
