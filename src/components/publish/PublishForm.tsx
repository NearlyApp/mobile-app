import { Form, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreatePost from '@hooks/posts/useCreatePost';
import useLocation from '@hooks/useLocation';
import { createPostSchema } from '@schemas/posts';
import { forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface IRef {
  onSubmit: () => void;
}

interface IProps {}

type FormValues = z.infer<typeof createPostSchema>;

const PublishForm = forwardRef<IRef, IProps>((props, ref) => {
  const { data: location, refetch } = useLocation();
  const { mutate } = useCreatePost();

  useLayoutEffect(() => {
    refetch();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      coords: location?.coords,
    },
  });

  const handleSubmit = (data: FormValues) => {
    mutate({
      content: data.content,
      parentPostUuid: data.parentPostUuid,
      lat: data.coords.lat,
      lng: data.coords.lng,
      alt: data.coords.alt,
    });
  };

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      form.handleSubmit(handleSubmit)();
    },
  }));

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <Textarea
              autoComplete="off"
              value={field.value as string}
              onChangeText={(value: string) =>
                field.onChange({ target: { value } })
              }
              onBlur={field.onBlur}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
});

export default PublishForm;
