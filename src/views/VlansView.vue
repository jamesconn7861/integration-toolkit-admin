<script lang="ts">
import VlanCard from '@/components/VlanCard.vue';
import { useUtilStore } from '@/stores/utils';
import type { VlanRecord } from '@/types';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  components: {
    VlanCard,
  },
  data() {
    return {
      vlans: undefined as VlanRecord[] | undefined,
    };
  },
  methods: {
    updateVlan(newRecord: VlanRecord, oldId: Number) {
      this.vlans?.splice(
        this.vlans?.findIndex((vlan) => vlan.id == oldId),
        1,
        newRecord,
      );
      this.vlans?.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
      );
    },
  },
  created() {
    useUtilStore()
      .axiosInst.get('/cached/vlan-schema')
      .then((res) => {
        (res.data as VlanRecord[]).sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        );
        this.vlans = res.data as VlanRecord[];
      });
  },
});
</script>

<template>
  <div class="vlan-cards">
    <VlanCard
      @update-vlan="updateVlan"
      v-for="(vlan, index) in vlans"
      :vlan="vlan"
      :index="index"
      :key="vlan.id"
    />
  </div>
</template>

<style>
.vlan-cards {
  margin: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
}
</style>
