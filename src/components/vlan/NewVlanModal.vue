<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const vName = ref<HTMLInputElement>();
      const vNumber = ref<HTMLInputElement>();
      const vDescription = ref<HTMLInputElement>();
      const vDepartment = ref<HTMLSelectElement>();
      const vProtected = ref<HTMLSelectElement>();
      const vVisible = ref<HTMLSelectElement>();
      const vNotes = ref<HTMLInputElement>();

      return {
        vName,
        vNumber,
        vDescription,
        vDepartment,
        vProtected,
        vVisible,
        vNotes,
      };
    },
    methods: {
      submitForm() {
        if (!this.vName?.value || !(this.vName.value.length > 0)) {
          alert('Invalid Name.');
          return;
        }

        if (
          !this.vNumber?.value ||
          !(this.vNumber.value.length > 0) ||
          isNaN(+this.vNumber.value)
        ) {
          alert('Invalid Vlan.');
          return;
        }

        this.$emit('commit', {
          id: this.vNumber?.value,
          name: this.vName?.value,
          description: this.vDescription?.value,
          notes: this.vNotes?.value,
          department: this.vDepartment?.value,
          protected: this.vProtected?.value,
          visibility: this.vVisible?.value,
        });

        this.$emit('close');
      },
      cancelForm() {
        this.$emit('close');
        document
          .querySelector('.vlan-form')
          ?.querySelectorAll('input')
          .forEach((vInput) => {
            vInput.value = '';
          });
      },
    },
  });
</script>

<template>
  <div class="overlay">
    <div class="modal-container">
      <form id="new_vlan_form" @submit.prevent="submitForm">
        <i class="fa-solid fa-xmark close-modal" @click="cancelForm"></i>
        <h2 class="form-title">New Vlan</h2>

        <span class="input-row">
          <p class="input-title">Name:</p>
          <input
            ref="vName"
            class="form-input"
            required="true"
            placeholder="Name" />
        </span>

        <span class="input-row">
          <p class="input-title">Vlan:</p>
          <input
            ref="vNumber"
            class="form-input"
            required="true"
            type="number"
            placeholder="Vlan" />
        </span>

        <span class="input-row">
          <p class="input-title">Description:</p>
          <input
            ref="vDescription"
            class="form-input"
            placeholder="Description" />
        </span>

        <span class="input-row">
          <p class="input-title">Department:</p>
          <select ref="vDepartment" class="form-select">
            <option value="Integration">Integration</option>
            <option value="Depot">Depot</option>
            <option value="Asset Disposistion">Asset Disposistion</option>
            <option value="Universal" selected="true">Universal</option>
          </select>
        </span>

        <span class="input-row">
          <p class="input-title">Protected:</p>
          <select ref="vProtected" class="form-select">
            <option value="0" selected="true">False</option>
            <option value="1">True</option>
          </select>
        </span>

        <span class="input-row">
          <p class="input-title">Visibility:</p>
          <select ref="vVisible" class="form-select">
            <option value="Visible" selected="true">Visible</option>
            <option value="Hidden">Hidden</option>
            <option value="Admin">Admin Only</option>
          </select>
        </span>

        <input class="form-input" ref="vNotes" placeholder="Notes" />

        <span class="buttons-container">
          <button class="modal-buttons" id="cancel-action" @click="cancelForm">
            Cancel
          </button>
          <button
            class="modal-buttons"
            id="commit-action"
            @click.native.prevent="submitForm">
            <p>Create Vlan <i class="fa-solid fa-check create-icon"></i></p>
          </button>
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #00000064;
    backdrop-filter: blur(10px);
    z-index: 100;
  }

  .modal-container {
    color: #1f1f1f;
    display: flex;
    flex-direction: column;
    background: #fff;
    height: fit-content;
    min-height: 500px;
    width: fit-content;
    min-width: 550px;
    border-radius: 18px;
    position: relative;
    align-items: center;
    padding: 20px;
  }

  #new_vlan_form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 15px;
    height: 100%;
    width: 100%;
    padding: 15px;
    flex-grow: 1;
  }

  .close-modal {
    color: #a7a7a7;
    font-size: 2rem;
    position: absolute;
    right: 20px;
    top: 15px;
  }

  .close-modal:hover {
    color: rgb(254, 125, 125);
    cursor: pointer;
  }

  .form-title {
    margin: 0;
    text-align: center;
    margin-top: -25px;
  }

  .input-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .input-title {
    margin: 0 10px 0 0;
    min-width: 100px;
  }

  .form-input {
    padding: 8px;
    background: #dcf0ff;
    border-radius: 3px;
    border: none;
    flex-grow: 1;
  }

  .form-select {
    padding: 8px;
    border-radius: 5px;
  }

  input:invalid {
    background: rgb(247, 142, 142);
  }

  .buttons-container {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .create-icon {
    margin-left: 5px;
  }

  .modal-buttons {
    width: 175px;
    height: 45px;
    border-radius: 26px;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    transition: opacity 0.2s;
  }

  .modal-buttons:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  #cancel-action {
    background: #627c97;
  }

  #commit-action {
    background: #30d651;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
