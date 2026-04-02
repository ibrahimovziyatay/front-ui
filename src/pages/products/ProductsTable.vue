<script setup>
import TableView from "@/components/TableView.vue";
import { validateRequest } from "@/libs/auth";
import { endpoints } from "@/libs/endpoint";
import axios from "axios";
import { Loader2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const user = validateRequest();
const products = ref(null);
const error = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const { data } = await axios.get(endpoints.items, {
      headers: { role: user.role },
    });
    products.value = data;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Something went wrong, can not connect with server";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="w-full flex justify-center items-center py-4">
    <!-- Loading -->
    <div
      v-if="isLoading"
      class="h-[120px] w-full flex ring-2 ring-primary justify-center items-center bg-secondary rounded-lg"
    >
      <Loader2 class="size-10 text-primary animate-spin" />
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="h-[120px] w-full flex ring-2 ring-primary justify-center text-destructive text-lg font-medium items-center bg-secondary rounded-lg"
    >
      <p>{{ error }}</p>
    </div>

    <!-- Success -->
    <div v-else class="w-full space-y-4">
      <!-- Stats -->
      <div
        v-if="products?.stats"
        class="flex flex-wrap gap-4 w-full justify-between"
      >
        <div
          class="flex-1 flex ring ring-primary rounded-lg p-3 justify-center items-center gap-2 bg-card"
        >
          <p class="font-medium">Total products:</p>
          <p class="text-primary">{{ products.stats.total }}</p>
        </div>
        <div
          class="flex-1 flex ring ring-primary rounded-lg p-3 justify-center items-center gap-2 bg-card"
        >
          <p class="font-medium">Average price:</p>
          <p class="text-primary">{{ products.stats.averagePrice }}</p>
        </div>
      </div>

      <!-- Table -->
      <div v-if="products?.products?.length">
        <TableView :items="products.products" caption="A list of products" />
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="h-[120px] flex justify-center items-center bg-muted rounded-lg text-muted-foreground"
      >
        No products found.
      </div>
    </div>
  </div>
</template>
