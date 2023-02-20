import { useUtilStore } from '@/stores/utils';
import type { VlanRecord } from '@/types';

async function updateVlan(
  vlanSchema: VlanRecord[],
  newRecord: VlanRecord,
  oldId: Number,
) {
  useUtilStore()
    .axiosInst.post('/admin/update-vlans', {
      oldId,
      ...newRecord,
    })
    .then(async () => {
      spliceUpdatedVlan(vlanSchema, newRecord, oldId);
      await sortVlanList(vlanSchema);
      useUtilStore().showTempMsg('Vlan updated.', 5000);
    })
    .catch((err) => {
      useUtilStore().showTempMsg(err.response.data.message, 5000);
    });
}

async function createVlan(vlanSchema: VlanRecord[], newVlan: VlanRecord) {
  useUtilStore()
    .axiosInst.post('/admin/create-vlan', newVlan)
    .then(async () => {
      vlanSchema.push(newVlan);
      await sortVlanList(vlanSchema);

      // this.isVlanModalOpen = false;
      useUtilStore().showTempMsg('Vlan created.', 5000);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteVlan(vlanSchema: VlanRecord[], deleteId: number) {
  useUtilStore()
    .axiosInst.delete(`/admin/delete-vlan/${deleteId}`)
    .then(() => {
      vlanSchema.splice(
        vlanSchema.findIndex((vlan) => vlan.id == deleteId),
        1,
      );
      useUtilStore().showTempMsg('Vlan Deleted', 5000);
    })
    .catch(() => {
      useUtilStore().showTempMsg(
        'The selected vlan cannot be deleted at this time. Please try again later.',
        5000,
      );
    });
}

async function sortVlanList(vlanSchema: VlanRecord[]): Promise<VlanRecord[]> {
  return new Promise((resolve) => {
    resolve(
      vlanSchema.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0,
      ),
    );
  });
}

function spliceUpdatedVlan(
  vlanSchema: VlanRecord[],
  newRecord: VlanRecord,
  oldId: Number,
) {
  vlanSchema.splice(
    vlanSchema.findIndex((vlan) => vlan.id == oldId),
    1,
    newRecord,
  );
}

async function loadVlanSchema(): Promise<VlanRecord[]> {
  return new Promise((resolve) => {
    useUtilStore()
      .axiosInst.get('/cached/vlan-schema')
      .then(async (res) => {
        const sortedVlans = await sortVlanList(res.data as VlanRecord[]);
        resolve(sortedVlans);
      });
  });
}

export { loadVlanSchema, updateVlan, createVlan, deleteVlan };
