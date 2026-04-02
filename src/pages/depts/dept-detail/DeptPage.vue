<template>
  <div class="mx-auto max-w-2xl flex w-full flex-col justify-center items-center p-4">
    <h1 class="text-2xl font-bold mb-6 text-primary">Dept Detail</h1>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="h-[150px] w-full flex flex-col justify-center items-center gap-2 bg-card rounded-xl shadow-md border"
    >
      <Loader2 class="size-8 text-primary animate-spin" />
      <p class="text-muted-foreground text-sm">Loading dept details...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="h-[150px] w-full flex flex-col justify-center items-center gap-2 bg-destructive/10 rounded-xl shadow-md border text-destructive p-4"
    >
      <p class="font-medium">{{ errorMessage }}</p>
    </div>

    <!-- Dept Details -->
    <div
      v-else-if="!!dept"
      class="bg-card text-card-foreground shadow-lg rounded-xl border w-full max-w-lg p-6 flex flex-col space-y-6"
    >
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-2">
        <h2 class="text-xl font-semibold">User Information</h2>
        <span
          :class="[
            'px-3 py-1 text-xs rounded-full font-medium',
            dept.depstAmount > 0
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'bg-green-100 text-green-700 border border-green-300',
          ]"
        >
          {{ dept.depstAmount > 0 ? "Active" : "Cleared" }}
        </span>
      </div>

      <!-- Detail rows -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col bg-muted rounded-lg p-3 border">
          <span class="text-sm text-muted-foreground">Name</span>
          <span class="font-medium">{{ dept.user }}</span>
        </div>

        <div class="flex flex-col bg-muted rounded-lg p-3 border">
          <span class="text-sm text-muted-foreground">Electric Code</span>
          <span class="font-medium">{{ dept.electricCode }}</span>
        </div>

        <div class="flex flex-col bg-muted rounded-lg p-3 border">
          <span class="text-sm text-muted-foreground">Dept Amount</span>
          <span class="font-medium">{{ dept.depstAmount }}</span>
        </div>

        <div class="flex flex-col bg-muted rounded-lg p-3 border">
          <span class="text-sm text-muted-foreground">Status</span>
          <span
            :class="
              dept.depstAmount > 0
                ? 'text-primary font-medium'
                : 'text-green-600 font-medium'
            "
          >
            {{ dept.depstAmount > 0 ? "Active" : "Cleared" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { endpoints } from "@/libs/endpoint";
import axios from "axios";
import { Loader2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const dept = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);

const fetchDept = async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`${endpoints.depts}/${id}`);
    dept.value = res.data;
    document.title = `${dept.value.user } (${id}) | ${
      dept.value.depstAmount > 0 ? "Active Dept" : "Cleared Dept"
    }`;
  } catch (error) {
    errorMessage.value = error.message || "Failed to load dept";
    document.title = "Dept Detail | Error";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchDept);
</script>
