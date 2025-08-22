<template>
  <UModal
    title="Feedback"
    description="We would love to hear your thoughts!"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
  >
    <UButton icon="i-lucide-search" color="neutral" variant="subtle" />

    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Feedback" name="feedback" required>
          <URadioGroup
            v-model="state.feedback"
            indicator="end"
            variant="card"
            default-value="System"
            :items="feedbackItems"
            orientation="horizontal"
            :ui="{
              indicator: 'hidden m-0',
              base: 'hidden',
              label: 'text-xs',
              wrapper: 'm-0 text-center',
              item: 'w-full'
            }"
          >
            <template #description="{ item }">
              <span class="text-2xl">{{ item.description }}</span>
            </template>

            <template #label="{ item }">
              <span class="text-xs">{{ item.label }}</span>
            </template>
          </URadioGroup>
        </UFormField>
        <UFormField label="Additional Feedback" name="message">
          <UTextarea v-model="state.message" :rows="5" class="w-full" />
        </UFormField>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, RadioGroupItem } from '@nuxt/ui';

const feedbackItems = ref<RadioGroupItem[]>([
  {
    label: 'Amazing',
    value: 'amazing',
    description: '🤩'
  },
  {
    label: 'Okay',
    value: 'okay',
    description: '😌'
  },
  {
    label: 'Meh',
    value: 'meh',
    description: '😟'
  },
  {
    label: 'Angry',
    value: 'angry',
    description: '😠'
  }
]);

const schema = z.object({
  feedback: z.string(),
  message: z.string().optional()
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  feedback: undefined,
  message: undefined
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  state.feedback = undefined;
  state.message = undefined;
  console.log(event.data);
}
</script>
