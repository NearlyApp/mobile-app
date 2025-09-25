import { Form, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@schemas/posts';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface IRef {
  onSubmit: () => void;
}

interface IProps {}

type FormValues = z.infer<typeof createPostSchema>;

const PublishForm = forwardRef<IRef, IProps>((props, ref) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <Textarea
              autoComplete="off"
              {...field}
              value={field.value as string}
              onChangeText={(value: string) =>
                field.onChange({ target: { value } })
              }
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
});

export default PublishForm;
