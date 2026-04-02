<template>
  <div
    class="border mx-auto border-muted-foreground bg-card p-6 space-y-4 rounded-xl flex flex-col justify-center w-full max-w-md shadow-md"
  >
    <h1 class="text-2xl text-primary font-bold text-center">Login</h1>
    <div class="flex flex-col space-y-4">
      <Input
        v-model="formData.username"
        type="text"
        class="h-12 rounded-lg bg-card border"
        placeholder="Username"
      />
      <PasswordInput
        v-model="formData.password"
        class="h-12 rounded-lg bg-card border"
        placeholder="Password"
      />
      <LoadingButton
        @click="login"
        class="h-12"
        :isLoading="isLoading"
        :disabled="!formData.username.trim() || !formData.password.trim()"
      >
        {{ isLoading ? "Loading" : "Login" }}
      </LoadingButton>
    </div>
  </div>
</template>

<script setup>
import LoadingButton from "@/components/ui/button/LoadingButton.vue";
import Input from "@/components/ui/input/Input.vue";
import PasswordInput from "@/components/ui/input/PasswordInput.vue";
import { setLogin } from "@/libs/auth";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { loginFN } from "./action";

const router = useRouter();

const formData = reactive({
  username: "",
  password: "",
});
const isLoading = ref(false);

const login = async () => {
  if (!formData.username.trim() || !formData.password.trim()) return;

  isLoading.value = true;

  try {
    const { result, success, message } = await loginFN(formData);

    if (success && result?.username) {
      const capitalizedUsername =
        result.username.charAt(0).toUpperCase() + result.username.slice(1);
      setLogin(result);
      toast.success(`Welcome back, ${capitalizedUsername}`, {
        description: "Good tp see you again",
      });
      router.push(
        `${
          ["admin", "meneger"].includes(result.role)
            ? "/dashboard/products"
            : "/"
        }`
      );
    } else {
      console.log("Login failed:", message || "Unknown error");
      toast.error("Login failed", {
        description: message || "Something went wrong",
      });
    }
  } catch (error) {
    console.log("Unexpected error:", error.message);
    toast.error("Login failed", {
      description: error.message || "Network error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
