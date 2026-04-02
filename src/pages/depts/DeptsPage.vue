<template>
  <div
    class="flex max-w-5xl mx-auto w-full flex-col justify-center items-center space-y-4"
  >
    <h1 class="text-primary text-lg">Electric depts</h1>
    <div
      v-if="isLoading"
      class="h-[120px] mx-auto w-full flex ring-2 ring-primary justify-center items-center bg-secondary rounded-lg"
    >
      <Loader2 class="size-10 text-primary animate-spin" />
    </div>
    <div
      v-else-if="errorMessage"
      class="h-[120px] w-full mx-auto flex ring-2 ring-primary justify-center text-destructive text-lg font-medium items-center bg-secondary rounded-lg"
    >
      <p>{{ errorMessage }}</p>
    </div>
    <ul
      class="w-full grid grid-cols-1 md:grid-cols-3 p-2 gap-2"
      v-else-if="!!depstDataList"
    >
      <DeptItem v-for="item in depstDataList" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup>
import DeptItem from "@/components/DeptItem.vue";
import { endpoints } from "@/libs/endpoint";
import axios from "axios";
import { Loader2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const depstDataList = ref([]); // ✅ use ref for arrays
const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(endpoints.depts);
    depstDataList.value = res.data; // ✅ assign data correctly
  } catch (error) {
    errorMessage.value = error.message || "Something went wrong";
  } finally {
    isLoading.value = false;
  }
});
</script>
