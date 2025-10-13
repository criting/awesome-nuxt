<template>
  <UModal
    title="Feedback"
    description="We would love to hear your thoughts about this project!"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
  >
    <UButton icon="i-lucide-message-circle-heart" color="secondary" variant="ghost" />

    <template #body>
      <div
        v-if="isSubmitted"
        key="success"
        role="status"
        aria-live="polite"
        aria-label="Feedback submitted successfully"
      >
        Thank you for your feedback!
      </div>
      <UForm
        v-else
        :state="formState"
        :schema="feedbackFormSchema"
        class="space-y-4"
        @submit="submitFeedback"
      >
        <UFormField label="How do you feel about this project?" name="feedback" required>
          <div
            layout
            class="flex flex-row gap-2 mt-2"
            role="radiogroup"
            aria-labelledby="feedback-legend"
          >
            <UButton
              v-for="option in FEEDBACK_OPTIONS"
              :key="option.value"
              class="w-full bg-white dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-900 active:bg-gray-100 flex items-center justify-center rounded-lg border transition-all duration-150 focus:outline-0 py-3"
              :class="[formState.rating === option.value ? 'border-primary' : 'border-default']"
              :aria-label="`Rate as ${option.label}`"
              :aria-pressed="formState.rating === option.value"
              role="radio"
              :aria-checked="formState.rating === option.value"
              @click="handleRatingSelect(option.value)"
            >
              <div class="dark:text-white text-gray-500">
                <span class="text-lg">{{ option.emoji }}</span>
                <div class="text-xs mt-1">{{ option.label }}</div>
              </div>
            </UButton>
          </div>
        </UFormField>
        <UFormField label="Additional Feedback (optional)" name="message">
          <UTextarea v-model="formState.feedback" :rows="5" class="w-full mt-1" />
        </UFormField>

        <UButton
          type="submit"
          :disabled="isSubmitting"
          class="focus:outline-0"
          :aria-label="isSubmitting ? 'Sending feedback...' : 'Send feedback'"
        >
          {{ isSubmitting ? 'Sending...' : 'Send' }}
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { feedbackFormSchema } from '@@/shared/types/feedback';

const props = defineProps<{
  page: {
    title: string;
  };
}>();

const { formState, isSubmitted, isSubmitting, handleRatingSelect, submitFeedback } =
  useFeedbackForm(props);
</script>
