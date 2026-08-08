<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
  >
    <template #footer>
      <div class="flex w-full justify-end gap-3">
        <UButton variant="ghost" color="neutral" @click="handleCancel">
          Batal
        </UButton>

        <UButton color="error" :loading="loading" @click="handleConfirm">
          {{ confirmLabel }}
        </UButton>
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
  title: 'Apakah kamu yakin?',
  description: 'Tindakan ini tidak bisa dibatalkan.',
  confirmLabel: 'Hapus',
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