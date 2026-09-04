<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :ui="{ wrapper: 'rounded-3xl' }"
  >
    <template #footer>
      <div class="flex w-full justify-end gap-3 font-sans text-sm">
        <button
          type="button"
          class="rounded-full border border-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 hover:scale-105 active:scale-[0.98] dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          @click="handleCancel"
        >
          Cancel
        </button>

        <button
          type="button"
          :disabled="loading"
          class="rounded-full bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 hover:scale-105 active:scale-[0.98] disabled:opacity-50"
          @click="handleConfirm"
        >
          {{ loading ? 'Deleting...' : confirmLabel }}
        </button>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  description?: string
  confirmLabel?: string
  loading?: boolean
}>(), {
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  confirmLabel: 'Delete',
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  isOpen.value = false
  emit('cancel')
}
</script>