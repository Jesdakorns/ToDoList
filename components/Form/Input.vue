<script setup lang="ts">
import { toRef, reactive, defineComponent } from "vue";
import {
  useField,
  ErrorMessage,
  useForm,
  Field,
  FieldContext,
} from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  bind: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  rules: {
    type: String,
    default: "",
  },
  field: {
    type: Object as () => FieldContext,
  },
});

</script>

<template>
  <Field
    :name="props.name"
    v-slot="{ field, handleChange, errorMessage }"
    autocapitalize="off"
  >
    <div class="w-100">
      <v-text-field
        variant="outlined"
        hide-details="auto"
        v-bind="field"
        @input="handleChange"
       :placeholder="props.placeholder"
      
      />
      <p class="error-message" v-show="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </Field>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 13px;
  padding: 5px 10px;
}
</style>
