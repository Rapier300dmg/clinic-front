
<template>
    <div class="dropdown">
      <button @click="toggleDropdown" class="dropdown-btn">
        {{ selectedOption || 'Выберите специализацию' }}
      </button>
      <ul v-show="isOpen" class="dropdown-menu">
        <li v-for="option in options" :key="option" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  /* eslint-disable vue/multi-word-component-names */
  export default {
    name: 'Dropdown',
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isOpen: false,
        selectedOption: ''
      }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('select', option);
        this.isOpen = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
  }
  .dropdown-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
    width: 100%;
    z-index: 10;
  }
  .dropdown-menu li {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .dropdown-menu li:hover {
    background: #f0f0f0;
  }
  </style>
  