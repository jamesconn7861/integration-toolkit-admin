<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import type { PropType } from 'vue';
  import type { BenchRecord } from '@/types/BenchRecord';

  export default defineComponent({
    props: {
      bench: {
        type: Object as PropType<BenchRecord>,
        required: true,
      },
    },
    setup(props) {
      const cardContainer = ref<HTMLDivElement>();
      const expandToggle = ref<HTMLImageElement>();

      const currentBench = reactive({ ...props.bench });
      return { cardContainer, expandToggle, currentBench };
    },
    methods: {
      expandCard() {
        if (!this.cardContainer?.classList.contains('open')) {
          document.querySelectorAll('.open').forEach((openCard) => {
            openCard.classList.remove('open');
            openCard
              .querySelector('.bx-chevron-up')
              ?.classList.replace('bx-chevron-up', 'bx-chevron-down');
          });
          this.cardContainer?.classList.add('open');
          this.expandToggle?.classList.replace(
            'bx-chevron-down',
            'bx-chevron-up',
          );
        } else {
          this.expandToggle?.classList.replace(
            'bx-chevron-up',
            'bx-chevron-down',
          );
          this.cardContainer?.classList.remove('open');
        }
      },
      updateCardFields() {
        this.$emit('updateBench', { ...this.currentBench }, this.bench?.id);
      },
      deleteBench() {
        this.$emit('deleteBench', this.currentBench.id);
      },
    },
  });
</script>

<template>
  <div class="card-container">
    <div class="card blue" ref="cardContainer">
      <div class="card-title">
        <span class="card-title-text">{{ currentBench.id }}</span>
        <i
          ref="expandToggle"
          class="bx bx-chevron-down"
          id="expand-toggle"
          @click="expandCard"></i>
      </div>
      <div class="card-expand">
        <div class="card-field name-field">
          <span class="input-description">Name: </span>
          <input class="card-input name-input" v-model="currentBench.id" />
        </div>
        <div class="card-field vlan-field">
          <span class="input-description">Switch: </span>
          <input class="card-input vlan-input" v-model="currentBench.switch" />
        </div>
        <div class="card-field desc-field">
          <span class="input-description">Range: </span>
          <input class="card-input desc-input" v-model="currentBench.range" />
        </div>
        <div class="card-field dept-field">
          <span class="input-description">Department: </span>
          <select
            class="card-input dept-input"
            v-model="currentBench.department">
            <option value="Integration">Integration</option>
            <option value="Depot">Depot</option>
            <option value="Asset Disposistion">Asset Disposistion</option>
            <option value="Universal">Universal</option>
          </select>
        </div>
        <div class="card-field protect-field">
          <span class="input-description">Protected: </span>
          <select
            class="card-input protect-input"
            v-model="currentBench.locked">
            <option value="0">Not Protected</option>
            <option value="1">Protected</option>
          </select>
        </div>
        <div class="card-field vis-field">
          <span class="input-description">Visibility: </span>
          <select
            class="card-input vis-input"
            v-model="currentBench.visibility">
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden</option>
            <option value="Admin">Admin Only</option>
          </select>
        </div>
        <div class="card-field note-field" :title="currentBench.notes">
          <span class="input-description">Notes: </span>
          <input class="card-input note-input" v-model="currentBench.notes" />
        </div>
        <div class="card-actions-container">
          <i
            title="Update Bench"
            class="bx bx-check-circle card-action"
            id="commit-change"
            @click="updateCardFields"></i>
          <i
            class="bx bx-trash-alt card-action"
            id="delete-item"
            title="Delete Bench"
            @click="deleteBench"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card-container {
    display: flex;
    justify-content: flex-start;
    flex: 0 0 25%;
  }

  .id-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: #337791;
    width: 69px;
    height: 100%;
  }

  .card-id-text {
    z-index: 5;
  }

  .tooltip {
    display: inline-block;
    position: relative;
    text-align: left;
  }

  .tooltip-title {
    margin-block: 0;
  }

  .tooltip .left {
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 15px;
    width: auto;
    min-width: 300px;
    max-width: 300px;
    max-height: 300px;
    top: 50%;
    right: 100%;
    margin-right: 20px;
    transform: translate(0, -50%);
    padding: 10px 20px;
    color: #ffffff;
    background-color: #334b6a;
    font-weight: normal;
    font-size: 16px;
    border-radius: 8px;
    position: absolute;
    z-index: 99999999;
    box-sizing: border-box;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .tooltip:hover .left {
    visibility: visible;
    opacity: 1;
  }

  .tooltip:hover {
    color: #55739a;
    cursor: pointer;
  }

  .tooltip .left i {
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -12px;
    width: 12px;
    height: 24px;
    overflow: hidden;
  }

  .tooltip .left i::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background-color: #334b6a;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }
  .card-container.open {
    height: auto;
  }

  .card-expand {
    display: flex;
    flex-direction: column;
    gap: 10px;
    display: none;
  }

  .field-info {
    font-size: 24px;
    position: absolute;
    right: 1%;
    top: 15%;
  }

  #expand-toggle {
    font-size: 36px;
  }

  #expand-toggle:hover {
    color: #00bd7e;
    cursor: pointer;
  }

  .card {
    font-size: 1rem;
    font-weight: 400;
    position: relative;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
    width: 400px;
    height: fit-content;
    overflow: hidden;
    /* transition: transform 0.2s; */
    font-family: 'Inter', sans-serif;
    margin: 10px;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    box-shadow: 6px 6px 5px 0px rgb(0 0 0 / 50%);
    flex-grow: 0;
  }

  .card-open {
    max-height: none;
  }

  .card.open .card-expand {
    display: flex;
  }

  /* .card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  background: radial-gradient(#2b4669, #2d4768);
  transform: translate(3px, 3px);
} */

  .title-bar {
    margin: auto;
    grid-row: 1;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .input-description {
    width: 95px;
    display: inline-block;
    font-weight: 600;
    font-size: 14px;
    z-index: 5;
  }

  input {
    border-radius: 5px;
    border: none;
    width: 65%;
    padding: 5px;
    transition: all 0.2s;
    box-shadow: 5px 5px 5px 0px rgb(0 0 0 / 54%);
    margin: 2px 0;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  }

  input:hover {
    background-color: #00bd7e;
  }

  input:focus {
    outline: none;
  }

  select {
    border-radius: 5px;
    border: none;
    width: 65%;
    padding: 5px;
    transition: all 0.2s;
    box-shadow: 5px 5px 5px 0px rgb(0 0 0 / 54%);
    margin: 2px 0;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  }

  select:focus-visible {
    outline: none;
  }

  .card-input {
    background: #334b6a;
    color: rgba(255, 255, 255, 0.9);
  }

  .card-title {
    font-size: 1.4rem;
    color: #ffffff;
    text-align: center;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card-title-text {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-field {
    font-size: 1rem;
    font-weight: 400;
    position: relative;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
  }

  .card-actions-container {
    display: flex;
    flex-direction: row;
    font-size: 2rem;
    justify-content: flex-end;
    gap: 10px;
    justify-content: space-between;
    flex-grow: 1;
    align-items: flex-end;
  }

  .card-action:hover {
    cursor: pointer;
  }

  #commit-change:hover {
    color: rgb(113, 226, 101);
  }

  #delete-item:hover {
    color: rgb(195, 97, 97);
  }

  /* CARD BACKGROUNDS */
  .blue {
    background: radial-gradient(#233955, #233955);
  }

  .red {
    background: radial-gradient(#8d3f3f, #852727);
  }

  .card-3 {
    background: radial-gradient(#76b2fe, #b69efe);
  }

  .card-4 {
    background: radial-gradient(#60efbc, #58d5c9);
  }

  .card-5 {
    background: radial-gradient(#f588d8, #c0a3e5);
  }

  /* RESPONSIVE */
  @media (max-width: 1600px) {
    .cards {
      justify-content: center;
    }
  }
</style>
