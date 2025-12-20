import i18n from '@/i18n';
import { Button } from '@components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Text } from '@components/ui/text';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import useCoordinatesValidation from '@hooks/location/useCoordinatesValidation';
import useLocation, { LocationError } from '@hooks/location/useLocation';
import { useCreatePost } from '@modules/posts/posts.hooks';
import { createPostSchema } from '@modules/posts/posts.schemas';
import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Pressable } from 'react-native';
import z from 'zod';

interface IProps {
  onSubmitButtonReady?: (button: React.ReactElement) => void;
}

type FormValues = z.infer<typeof createPostSchema>;

const PublishForm: React.FC<IProps> = ({ onSubmitButtonReady }) => {
  const {
    data: location,
    error: locationError,
    refetch,
    permissionStatus,
    requestPermissionAndRefetch,
    openSettings,
  } = useLocation();
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
    });
    mutate(
      {
        content: data.content,
        ...(data.parentPostUuid ? { parentPostUuid: data.parentPostUuid } : {}),
        lat: data.coords.lat,
        lng: data.coords.lng,
      },
      {
        onError: (error) => {
          console.error(error);
        },
        onSuccess: (data) => {
          console.log('Post created successfully:', data);
        },
      },
    );
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
      const error = locationError as LocationError;
      const needsSettings =
        permissionStatus === 'denied_permanently' || error?.shouldOpenSettings;

      const message =
        error?.code === 'services_disabled'
          ? 'Les services de localisation sont désactivés sur votre appareil.'
          : error?.code === 'permission_denied_permanently'
            ? "L'accès à la localisation a été refusé. Veuillez l'activer dans les paramètres."
            : 'Impossible de récupérer votre position. Veuillez vérifier que la géolocalisation est activée.';

      Alert.alert('Erreur de géolocalisation', message, [
        needsSettings
          ? { text: 'Ouvrir les paramètres', onPress: openSettings }
          : { text: 'Réessayer', onPress: requestPermissionAndRefetch },
        { text: 'OK', style: 'cancel' },
      ]);
    }
  }, [locationError, permissionStatus, requestPermissionAndRefetch, openSettings]);

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
            {(!location || locationError) && (
              <Pressable
                onPress={
                  permissionStatus === 'denied_permanently'
                    ? openSettings
                    : requestPermissionAndRefetch
                }
              >
                <Text className="mt-2 text-sm text-yellow-600">
                  ⚠️ La localisation n'est pas disponible.{' '}
                  <Text className="text-yellow-700 underline">
                    {permissionStatus === 'denied_permanently'
                      ? 'Ouvrir les paramètres'
                      : 'Activer la géolocalisation'}
                  </Text>
                </Text>
              </Pressable>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default PublishForm;
