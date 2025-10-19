import i18n from '@/i18n';
import { Button } from '@components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Text } from '@components/ui/text';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import useCoordinatesValidation from '@hooks/location/useCoordinatesValidation';
import useLocation from '@hooks/location/useLocation';
import useCreatePost from '@hooks/posts/useCreatePost';
import { createPostSchema } from '@schemas/posts';
import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import z from 'zod';

interface IProps {
  onSubmitButtonReady?: (button: React.ReactElement) => void;
}

type FormValues = z.infer<typeof createPostSchema>;

const PublishForm: React.FC<IProps> = ({ onSubmitButtonReady }) => {
  const { data: location, error: locationError, refetch } = useLocation();
  const { mutate, isPending: isCreatingPost } = useCreatePost();
  const { validateCoordinates, getCoordinatesErrorMessage } =
    useCoordinatesValidation();

  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      coords: {
        lat: 0,
        lng: 0,
        alt: null,
      },
    },
  });

  useLayoutEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (location?.coords) {
      form.setValue('coords', location.coords);
    }
  }, [location, form]);

  const handleSubmit = (data: FormValues) => {
    if (!validateCoordinates(data.coords)) {
      const errorMessage = getCoordinatesErrorMessage(data.coords);
      Alert.alert(
        'Location Required',
        errorMessage || 'Please enable geolocation to publish a post.',
        [
          { text: 'Retry', onPress: () => refetch() },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
      return;
    }
    console.log('Submitting post with data:', {
      content: data.content,
      ...(data.parentPostUuid ? { parentPostUuid: data.parentPostUuid } : {}),
      lat: data.coords.lat,
      lng: data.coords.lng,
      alt: data.coords.alt || null,
    });
    mutate({
      content: data.content,
      ...(data.parentPostUuid ? { parentPostUuid: data.parentPostUuid } : {}),
      lat: data.coords.lat,
      lng: data.coords.lng,
      alt: data.coords.alt || null,
    }, {
      onError: (error) => {
        console.error(error)
      }
    });
  };

  useEffect(() => {
    if (onSubmitButtonReady) {
      const submitButton = (
        <Button
          onPress={() => form.handleSubmit(handleSubmit)()}
          disabled={isCreatingPost || !location}
        >
          <Text>{i18n.t('publish.submit')}</Text>
        </Button>
      );
      onSubmitButtonReady(submitButton);
    }
  }, [onSubmitButtonReady, form, handleSubmit]);

  useEffect(() => {
    if (locationError) {
      Alert.alert(
        'Geolocation Error',
        'Unable to retrieve your position. Please check that geolocation is enabled.',
        [
          { text: 'Retry', onPress: () => refetch() },
          { text: 'OK', style: 'cancel' },
        ],
      );
    }
  }, [locationError, refetch]);

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
              placeholder="What would you like to share?"
              editable={!isCreatingPost}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default PublishForm;
