<script lang="ts">
  import {
    loadVlanSchema,
    updateVlan,
    createVlan,
    deleteVlan,
  } from '@/utils/vlanUtils';
  import WarningModal from '@/components/modals/WarningModal.vue';
  import VlanDialog from '@/components/vlan/NewVlanModal.vue';
  import VlanCard from '@/components/vlan/VlanCard.vue';
  import type { VlanRecord } from '@/types';
  import { defineComponent, reactive } from 'vue';

  export default defineComponent({
    async setup() {
      const vlanSchemaData = await loadVlanSchema();
      const vlanSchema = reactive(vlanSchemaData);
      return { vlanSchema };
    },
    data() {
      return {
        showDeleteModal: false,
        showVlanModal: false as boolean,
        tempDeleteId: undefined as number | undefined,
        tempDeleteName: undefined as string | undefined,
      };
    },
    components: {
      VlanCard,
      VlanDialog,
      WarningModal,
    },
    methods: {
      async update(newRecord: VlanRecord, oldId: Number) {
        await updateVlan(this.vlanSchema, newRecord, oldId);
      },
      async create(newVlan: VlanRecord) {
        await createVlan(this.vlanSchema, newVlan);
      },
      confirmDelete(vlanId: number, vlanName: string) {
        this.tempDeleteId = vlanId;
        this.tempDeleteName = vlanName;
        this.showDeleteModal = true;
      },
      async processDelete() {
        await deleteVlan(this.vlanSchema, this.tempDeleteId as number);
        this.clearDelete();
      },
      clearDelete() {
        this.showDeleteModal = false;
        this.tempDeleteId = undefined;
      },
      openVlanModal() {
        this.showVlanModal = true;
      },
      closeVlanModal() {
        this.showVlanModal = false;
      },
    },
  });
</script>

<template>
  <div class="new-vlan-container">
    <button id="add_vlan" @click="openVlanModal">Add New Vlan</button>
  </div>
  <Transition>
    <VlanDialog v-if="showVlanModal" @close="closeVlanModal" @commit="create">
    </VlanDialog>
  </Transition>
  <Transition>
    <WarningModal
      v-if="showDeleteModal"
      @close="clearDelete"
      @confirm="processDelete">
      <template v-slot:title-text-slot> Delete Vlan? </template>
      <template v-slot:description-text-slot>
        Are you sure you want to delete "{{ tempDeleteName }}"?<br />You can't
        undo this action.
      </template>
    </WarningModal>
  </Transition>
  <div class="vlan-cards">
    <VlanCard
      @update-vlan="update"
      @delete-vlan="confirmDelete"
      v-for="(vlan, index) in vlanSchema"
      :vlan="vlan"
      :index="index"
      :key="vlan.id" />
  </div>
</template>

<style>
  .vlan-cards {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;
  }

  .new-vlan-container {
    display: flex;
    align-items: center;
    margin: 20px 5px;
  }

  #add_vlan {
    padding: 15px;
    border-radius: 10px;
    background: #233955;
    border: none;
    color: white;
    font-size: 18px;
    margin-left: 10px;
    transition: all 0.2s ease;
  }

  #add_vlan:hover {
    transform: translate(1px, 1px);
    cursor: pointer;
    background-color: #355176;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
