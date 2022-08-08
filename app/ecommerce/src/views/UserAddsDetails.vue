<template>
  <div class="add-details">
    <div class="add-details__header">
      <input
        class="go-back-btn"
        type="button"
        @click="goBack()"
        value="Retour"
      />
      <input
        class="edit-btn"
        type="button"
        @click="editAdd()"
        value="Modifier"
      />
    </div>
    <Card :add="userAdd" :edit="editCard" />
  </div>
</template>

<script>
import { getPostId } from "@/api/adds";
import Card from "@/components/Card/Card";
export default {
  data() {
    return {
      userAdd: undefined,
      loading: false,
      selection: 1,
      editCard: false,
    };
  },
  components: {
    Card,
  },
  async mounted() {
    const response = await getPostId(this.$route.params.id);
    this.userAdd = response.data;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    editAdd() {
      this.editCard = true;
    },
  },
};
</script>

<style lang="scss">
.add-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &__header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    left: 0;
    top: 0;
    padding: 0 20px;

    input {
      background-image: linear-gradient(#42a1ec, #0070c9);
      border: 1px solid #0077cc;
      border-radius: 4px;
      color: #ffffff;
      cursor: pointer;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: -0.022em;
      min-width: 30px;
      padding: 4px 15px;
      height: 40px;
      text-align: center;
      &:hover {
        background-image: linear-gradient(#51a9ee, #147bcd);
        border-color: #169cfc;
        text-decoration: none;
      }
    }

    // .go-back-btn {
    // }
    // .edit-btn {
    // }
  }
}
</style>
