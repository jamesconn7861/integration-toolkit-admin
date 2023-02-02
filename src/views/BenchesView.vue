<script lang="ts">
import BenchCardVue from '@/components/BenchCard.vue';
import { useUtilStore } from '@/stores/utils';
import type { BenchRecord } from '@/types/BenchRecord';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  async setup() {
    const collator = new Intl.Collator('en', {
      numeric: true,
      sensitivity: 'base',
    });

    const benchSchemaData = await loadBenchSchema();

    benchSchemaData.sort((a, b) => collator.compare(a.id, b.id));

    const benchSchema = reactive(benchSchemaData);

    return { benchSchema, collator };
  },
  components: {
    BenchCardVue,
  },
  methods: {
    async updateBench(newRecord: BenchRecord, oldId: string) {
      return new Promise<void>((resolve) => {
        this.benchSchema?.splice(
          this.benchSchema?.findIndex((bench) => bench.id == oldId),
          1,
          newRecord,
        );
        this.benchSchema.sort((a, b) => this.collator.compare(a.id, b.id));
        resolve();
      });
    },
  },
});

const loadBenchSchema = async (): Promise<BenchRecord[]> => {
  return new Promise((resolve) => {
    useUtilStore()
      .axiosInst.get('/cached/bench-schema')
      .then((res) => {
        resolve(res.data as BenchRecord[]);
      });
  });
};
</script>

<template>
  <div class="bench-cards">
    <BenchCardVue
      @update-bench="updateBench"
      v-for="(bench, index) in benchSchema"
      :bench="bench"
      :index="index"
      :key="bench.id"
    />
  </div>
</template>

<style>
.bench-cards {
  margin: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
}
</style>
