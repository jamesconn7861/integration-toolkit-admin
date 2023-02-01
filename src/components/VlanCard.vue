<script lang="ts">
import type { VisibilityCodes, VlanRecord } from '@/types';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    vlan: Object as PropType<VlanRecord>,
  },
  data() {
    return {
      currentlyEditing: false as boolean,
      currentCard: undefined as HTMLDivElement | undefined,
    };
  },
  methods: {
    expandCard(e: MouseEvent) {
      const expandToggle = e.currentTarget as HTMLElement;
      const parentCard = expandToggle.closest('.card') as HTMLDivElement;

      if (expandToggle.classList.contains('bx-chevron-down')) {
        document.querySelectorAll('.open').forEach((openCard) => {
          openCard.classList.remove('open');
          openCard
            .querySelector('.bx-chevron-up')
            ?.classList.replace('bx-chevron-up', 'bx-chevron-down');
        });
        parentCard.classList.add('open');
        expandToggle.classList.replace('bx-chevron-down', 'bx-chevron-up');
      } else {
        expandToggle.classList.replace('bx-chevron-up', 'bx-chevron-down');
        parentCard.classList.remove('open');
      }
    },
    updateCardFields(e: MouseEvent) {
      const parentCard = (e.currentTarget as HTMLElement).closest(
        '.card',
      ) as HTMLDivElement;

      const updatedVlan: VlanRecord = {
        name: (parentCard.querySelector('.name-input') as HTMLInputElement)
          .value,
        id: +(parentCard.querySelector('.vlan-input') as HTMLInputElement)
          .value,
        description: (
          parentCard.querySelector('.desc-input') as HTMLInputElement
        ).value,
        department: +(
          parentCard.querySelector('.dept-input') as HTMLInputElement
        ).value,
        protected: +(
          parentCard.querySelector('.protect-input') as HTMLInputElement
        ).value,
        visibility: (parentCard.querySelector('.vis-input') as HTMLInputElement)
          .value as unknown as VisibilityCodes,
        notes: (parentCard.querySelector('.note-input') as HTMLInputElement)
          .value,
      };

      this.$emit('updateVlan', updatedVlan, this.vlan?.id);
    },
  },
});
</script>

<template>
  <div class="card-container">
    <div class="card blue">
      <div class="card-title">
        <span class="card-title-text">{{ `${vlan?.name} | ${vlan?.id}` }}</span>
        <i
          class="bx bx-chevron-down"
          id="expand-toggle"
          @click="expandCard"
        ></i>
      </div>
      <div class="card-field name-field">
        <span class="input-description">Name: </span>
        <input class="card-input name-input" :value="vlan?.name" />
      </div>
      <div class="card-field vlan-field">
        <span class="input-description">Vlan: </span>
        <input class="card-input vlan-input" :value="vlan?.id" />
      </div>
      <div class="card-field desc-field">
        <span class="input-description">Description: </span>
        <input class="card-input desc-input" :value="vlan?.description" />
      </div>
      <div class="card-field dept-field">
        <span class="input-description">Department: </span>
        <input
          class="card-input dept-input"
          type="number"
          :value="vlan?.department"
        />
        <i class="bx bx-info-circle field-info tooltip">
          <div class="left">
            <h4 class="tooltip-title">Department</h4>
            <p>
              Values can only include 0 (Unspecified / All), 1 (Integration), 2
              (Depot), 3 (Asset Disposition).
            </p>
            <i></i>
          </div>
        </i>
      </div>
      <div class="card-field protect-field">
        <span class="input-description">Protected: </span>
        <input
          class="card-input protect-input"
          type="number"
          :value="vlan?.protected"
        />
        <i class="bx bx-info-circle field-info tooltip">
          <div class="left">
            <h4 class="tooltip-title">Protected</h4>
            <p>
              Values can only include 0 (Not Protected) & 1 (Protected).
              Protected vlans will show a warning before allowing the user to
              change to the vlan.
            </p>
            <i></i>
          </div>
        </i>
      </div>
      <div class="card-field vis-field">
        <span class="input-description">Visibility: </span>
        <input class="card-input vis-input" :value="vlan?.visibility" />
        <i class="bx bx-info-circle field-info tooltip">
          <div class="left">
            <h4 class="tooltip-title">Visibility</h4>
            <p>Values can only include 'Visible' & 'Hidden'.</p>
            <i></i>
          </div>
        </i>
      </div>
      <div class="card-field note-field" :title="vlan?.notes">
        <span class="input-description">Notes: </span>
        <input class="card-input note-input" :value="vlan?.notes" />
      </div>
      <div class="card-actions-container">
        <i
          title="Update Vlan"
          class="bx bx-check-circle card-action"
          id="commit-change"
          @click="updateCardFields"
        ></i>
        <i
          class="bx bx-trash-alt card-action"
          id="delete-item"
          title="Delete Vlan"
        ></i>
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

.field-info {
  font-size: 24px;
  position: absolute;
  right: 15px;
  top: 15%;
}

#expand-toggle {
  position: absolute;
  font-size: 36px;
  right: 6px;
  top: 10px;
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
  height: 58px;
  overflow: hidden;
  transition: all 0.5s;
  font-family: 'Inter', sans-serif;
  margin: 10px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 6px 6px 5px 0px rgb(0 0 0 / 50%);
  flex-grow: 1;
}

.card.open {
  height: 400px;
}

.card:hover {
  /* box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4); */
  /* background: radial-gradient(#2b4669, #2d4768); */
  transform: translate(3px, 3px);
}

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

.card-input {
  background: #334b6a;
  color: rgba(255, 255, 255, 0.9);
}

.card-title {
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
  margin: 0;
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
