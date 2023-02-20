import { useUtilStore } from '@/stores/utils';
import type { BenchRecord } from '@/types/BenchRecord';

const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

async function sortBenchList(benchSchema: BenchRecord[]) {
  return benchSchema.sort((a, b) => collator.compare(a.id, b.id));
}

function spliceUpdatedBench(
  benchSchema: BenchRecord[],
  newRecord: BenchRecord,
  oldId: string,
) {
  benchSchema.splice(
    benchSchema.findIndex((bench) => bench.id == oldId),
    1,
    newRecord,
  );
}

async function loadBenchSchema(): Promise<BenchRecord[]> {
  return new Promise((resolve) => {
    useUtilStore()
      .axiosInst.get('/cached/bench-schema')
      .then((res) => {
        resolve(res.data as BenchRecord[]);
      });
  });
}

async function updateBench(
  benchSchema: BenchRecord[],
  newRecord: BenchRecord,
  oldId: string,
) {
  useUtilStore()
    .axiosInst.post('/admin/update-benches', {
      oldId,
      ...newRecord,
    })
    .then(async () => {
      spliceUpdatedBench(benchSchema, newRecord, oldId);
      await sortBenchList(benchSchema);
      useUtilStore().showTempMsg('Bench updated.', 5000);
    })
    .catch((err) => {
      useUtilStore().showTempMsg(err.response.data.message, 5000);
    });
}

async function createBench(benchSchema: BenchRecord[], newBench: BenchRecord) {
  useUtilStore()
    .axiosInst.post('/admin/create-bench', newBench)
    .then(async () => {
      benchSchema.push(newBench);
      await sortBenchList(benchSchema);

      useUtilStore().showTempMsg('Bench created.', 5000);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteBench(benchSchema: BenchRecord[], deleteId: string) {
  useUtilStore()
    .axiosInst.delete(`/admin/delete-bench/${deleteId}`)
    .then(() => {
      benchSchema.splice(
        benchSchema.findIndex((bench) => bench.id == deleteId),
        1,
      );
      useUtilStore().showTempMsg('Bench Deleted', 5000);
    })
    .catch(() => {
      useUtilStore().showTempMsg(
        'The selected bench cannot be deleted at this time. Please try again later.',
        5000,
      );
    });
}

export { loadBenchSchema, createBench, updateBench, deleteBench };
