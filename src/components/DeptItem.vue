<template>
  <RouterLink
    :to="{ name: 'Dept', params: { id: item.id } }"
    class="p-6  flex flex-col space-y-2 justify-center items-center border rounded-lg shadow-md bg-card"
  >
    <div class="w-full bg-muted rounded p-2 border flex justify-between items-center">
      <p>Name</p>
      <p>
        {{ item.user }}
      </p>
    </div>
    <div class="w-full bg-muted rounded p-2 border flex justify-between items-center">
      <p>Electric code</p>
      <p>
        {{ item.electricCode }}
      </p>
    </div>
    <div class="w-full bg-muted rounded p-2 border flex justify-between items-center">
      <p>Dept</p>
      <p>
        {{ item.depstAmount }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
