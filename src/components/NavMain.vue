<script setup>
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-vue-next";

defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Envanter</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton
              class="bg-transparent border border-transparent h-10 hover:bg-primary text-foreground transition-all duration-300 hover:text-secondary group-data-[state=open]/collapsible:bg-primary group-data-[state=open]/collapsible:text-secondary group-data-[state=open]/collapsible:hover:border-primary"
              :tooltip="item.title"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem
                v-for="subItem in item.items"
                :key="subItem.title"
              >
                <SidebarMenuSubButton as-child>
                  <div class="flex justify-start items-center gap-x-2">
                    <p>•</p>
                    <router-link :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </router-link>
                  </div>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
