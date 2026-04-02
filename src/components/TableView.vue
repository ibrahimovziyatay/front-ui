<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  caption: {
    type: String,
    default: "A list of data",
  },
});

const headers = computed(() => {
  if (!props.items.length) return [];
  return Object.keys(props.items[0]);
});
</script>

<template>
  <Table>
    <TableCaption>{{ caption }}</TableCaption>

    <!-- Header -->
    <TableHeader>
      <TableRow>
        <TableHead
          v-for="(head, inx) in headers"
          :key="inx"
          :class="inx + 1 === headers.length && 'text-right'"
          class="capitalize font-semibold"
        >
          {{ head }}
        </TableHead>
      </TableRow>
    </TableHeader>

    <!-- Body -->
    <TableBody>
      <TableRow v-for="(row, idx) in items" :key="idx">
        <TableCell
          v-for="(head, inx) in headers"
          :key="head"
          class="whitespace-pre-wrap py-4"
          :class="inx + 1 === headers.length && 'text-right'"
        >
          <span v-if="typeof row[head] === 'object'">
            {{ JSON.stringify(row[head], null, 2) }}
          </span>
          <span v-else>
            {{ row[head] }}
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
