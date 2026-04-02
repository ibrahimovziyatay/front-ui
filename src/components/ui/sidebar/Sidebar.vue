<script setup>
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SheetDescription from "@/components/ui/sheet/SheetDescription.vue";
import SheetHeader from "@/components/ui/sheet/SheetHeader.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import { cn } from "@/libs/utils";
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils";
import { watch } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  side: { type: String, required: false, default: "left" },
  variant: { type: String, required: false, default: "sidebar" },
  collapsible: { type: String, required: false, default: "offcanvas" },
  class: { type: null, required: false },
});

const { isMobile, open: desktopOpen, openMobile, setOpen } = useSidebar();
watch(desktopOpen, () => {
  console.log(isMobile.value, "ismobile", openMobile.value, "value mobirlopen");
});
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="
      cn(
        'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet
    v-else-if="isMobile"
    :open="desktopOpen"
    v-bind="$attrs"
    @update:open="setOpen"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      class="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div
        class="flex bg-background text-sidebar-foreground h-full w-full flex-col"
      >
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else-if="!isMobile"
    :class="
      cn(
        'bg-sidebar h-screen sticky top-0 text-sidebar-foreground flex  flex-col transition-all duration-200 ease-in-out overflow-hidden',
        desktopOpen ? 'w-[var(--sidebar-width)]' : 'w-0',
        props.class
      )
    "
    :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
