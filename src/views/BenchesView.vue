<script lang="ts">
  import BenchCardVue from '@/components/bench/BenchCard.vue';
  import type { BenchRecord } from '@/types/BenchRecord';
  import {
    loadBenchSchema,
    updateBench,
    createBench,
    deleteBench,
  } from '@/utils/benchUtils';
  import { defineComponent, reactive } from 'vue';
  import WarningModal from '@/components/modals/WarningModal.vue';
  import NewBenchModal from '@/components/bench/NewBenchModal.vue';

  export default defineComponent({
    async setup() {
      const collator = new Intl.Collator('en', {
        numeric: true,
        sensitivity: 'base',
      });

      const benchSchemaData = (await loadBenchSchema()).sort((a, b) =>
        collator.compare(a.id, b.id),
      );

      const benchSchema = reactive(benchSchemaData);

      return { benchSchema, collator };
    },
    components: {
      BenchCardVue,
      WarningModal,
      NewBenchModal,
    },
    data() {
      return {
        showDeleteModal: false,
        showBenchModal: false as boolean,
        tempDeleteId: undefined as string | undefined,
      };
    },
    methods: {
      openBenchModal() {
        this.showBenchModal = true;
      },
      closeBenchModal() {
        this.showBenchModal = false;
      },
      async update(newRecord: BenchRecord, oldId: string) {
        await updateBench(this.benchSchema, newRecord, oldId);
      },
      async create(newBench: BenchRecord) {
        await createBench(this.benchSchema, newBench);
      },
      confirmDelete(benchId: string) {
        this.tempDeleteId = benchId;
        this.showDeleteModal = true;
      },
      clearDelete() {
        this.tempDeleteId = undefined;
        this.showDeleteModal = false;
      },
      async completeDelete() {
        await deleteBench(this.benchSchema, this.tempDeleteId as string);
        this.clearDelete();
      },
    },
  });
</script>

<template>
  <div class="new-bench-container">
    <button id="add_bench" @click="openBenchModal">Add New Bench</button>
  </div>
  <Transition>
    <NewBenchModal
      v-if="showBenchModal"
      @close="closeBenchModal"
      @commit="create">
    </NewBenchModal>
  </Transition>
  <Transition>
    <WarningModal
      v-if="showDeleteModal"
      @close="clearDelete"
      @confirm="completeDelete">
      <template v-slot:title-text-slot> Delete Bench? </template>
      <template v-slot:description-text-slot>
        Are you sure you want to delete "{{ tempDeleteId }}"?<br />You can't
        undo this action.
      </template>
    </WarningModal>
  </Transition>
  <div class="bench-cards">
    <BenchCardVue
      @update-bench="update"
      @delete-bench="confirmDelete"
      v-for="(bench, index) in benchSchema"
      :bench="bench"
      :index="index"
      :key="bench.id" />
  </div>
</template>

<style>
  .bench-cards {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;
  }

  .new-bench-container {
    display: flex;
    align-items: center;
    margin: 20px 5px;
  }

  #add_bench {
    padding: 15px;
    border-radius: 10px;
    background: #233955;
    border: none;
    color: white;
    font-size: 18px;
    margin-left: 10px;
    transition: all 0.2s ease;
  }

  #add_bench:hover {
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
