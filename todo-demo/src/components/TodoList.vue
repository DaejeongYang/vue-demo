<template>
  <div :class="styles.TodoList">
    <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" @remove="on제거이벤트처리" @toggle="onToggle" />
  </div>
</template>

<script setup>
import TodoListItem from "./TodoListItem.vue";
import styles from "./TodoList.module.css";

const props = defineProps({
  todos: Array,
  on제거이벤트처리: Function,
  onToggle: Function,
});
</script>
