<template>
  <div class="add-details">
    <div class="add-details__card"></div>
  </div>
</template>

<script>
import Table from "../components/Table/Table";
import Pagination from "../components/Pagination/Pagination";
import axios from "axios";
</script>

<style lang="scss">
.add-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__card {
    height: 600px;
    width: 500px;
    padding: 30px 20px;
  }
}
</style>
