<template>
  <div class="add-details">
    <div
      class="add-details__header"
      :style="!currentState && { 'margin-bottom': '60px' }"
    >
      <input
        class="go-back-btn"
        type="button"
        @click="goBack()"
        value="Retour"
      />

      <input
        type="button"
        class="edit-btn"
        :key="component"
        @click="switchActive()"
        :value="isActiveName"
      />
    </div>

    <component
      :is="isActive"
      :add="userAdd"
      :currentState="currentState"
      @updateCard="updateUserCard"
    />
  </div>
</template>

<script>
import { getPostId } from "@/api/adds";
import Card from "@/components/Card/Card";
import EditCard from "@/components/Card/EditCard";
import { updateAdds } from "@/api/adds";

export default {
  data() {
    return {
      component: "Card",
      currentState: false,
      userAdd: undefined,
      loading: false,
      selection: 1,
    };
  },
  components: {
    Card,
    EditCard,
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
      alert("switch");
    },
    switchActive() {
      this.currentState = !this.currentState;
    },
    async updateUserCard(card) {
      try {
        await updateAdds(card);
        this.$toastMsg("L'annonce a été mise à jour !", "success");
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    isActive() {
      return this.currentState === true ? EditCard : Card;
    },
    isActiveName() {
      return this.currentState === true ? "Annonce" : "Modifier";
    },
  },
};
</script>

<style lang="scss">
.add-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  }
}
</style>
