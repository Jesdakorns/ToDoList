<script setup>
import { useForm, Form, Field } from "vee-validate";
import * as Yup from "yup";
import { onMounted, reactive } from "vue";
import Input from "./../components/Form/Input.vue";

const schema = Yup.object().shape({
  list: Yup.string().required(),
});

function required(value) {
  return value ? true : "This field is required";
}

const { defineInputBinds, setFieldValue, resetForm } = useForm({
  validationSchema: {
    list: required,
  },
});

onMounted(() => {
  resetForm({ values: { items: ["Test 1"] } });
});

const list = defineInputBinds("list");
const items = defineInputBinds("items");

const onSubmit = async (values, action) => {
  const newItems = [...items.value.value];
  newItems.unshift(values.list);
  setFieldValue("items", newItems);
  action.resetForm();
  // action.resetForm({ values: { name: "" } });
};

const removeItems = (key) => {
  const newItems = [...items.value.value];
  const idxFilter = newItems.findIndex((val, idx) => idx === key);
  newItems.splice(idxFilter, 1);
  setFieldValue("items", newItems);
};

const removeAllItems = (key) => {
  setFieldValue("items", []);
};
</script>

<template>
  <v-container>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      style="width: 100%"
      class="center-content"
    >
      <v-card
        title="To Do List"
        width="min(400px,100%)"
        class="pa-4 rounded-lg"
      >
        <v-card-actions>
          <Input
            name="list"
            v-bind="list"
            placeholder="Title"
            aria-label="input title"
          />
        </v-card-actions>
        <v-card-actions>
          <v-btn
            block
            variant="flat"
            size="x-large"
            rounded="lg"
            type="submit"
            color="indigo-darken-3"
            aria-label="add item"
            >Add Item</v-btn
          >
        </v-card-actions>
        <v-card-actions style="display: flex; justify-content: flex-end">
          <v-btn
            color="red-darken-1"
            @click="removeAllItems"
            aria-label="remove all items"
            >Clear all Items</v-btn
          >
        </v-card-actions>
        <v-card-text>
          <v-list lines="two" height="250">
            <div v-if="items.value?.length !== 0">
              <v-list-item
                v-for="(item, idx) in items.value"
                :key="idx"
                :title="item"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi mdi-text-box</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn
                    @click="removeItems(idx)"
                    color="error"
                    icon="mdi mdi-close-circle-outline"
                    variant="text"
                    aria-label="remove item"
                  ></v-btn>
                </template>
              </v-list-item>
            </div>
            <div v-else class="logo-not-data"></div>
          </v-list>
        </v-card-text>
      </v-card>
    </Form>
  </v-container>
</template>

<style>
body {
  background: #e9f4ff;
}
</style>
<style scoped>
@media only screen and (max-height: 600px) {
  .center-content {
    height: 100% !important;
  }
}

.center-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
}

.logo-not-data {
  background-image: url(/image/not_data.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: -webkit-fill-available;
  border-radius: 30px;
  filter: hue-rotate(45deg);
  padding: 10px;
}
</style>
