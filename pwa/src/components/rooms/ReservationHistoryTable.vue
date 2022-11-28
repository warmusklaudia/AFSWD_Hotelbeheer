<template>
  <table class="w-full table-auto">
    <tr class="text-left">
      <th class="p-3">Name</th>

      <th class="p-3">Period</th>

      <th class="p-3">Number of people</th>
    </tr>

    <tbody v-if="reservations.length > 0">
      <tr
        v-for="(o, i) of reservations"
        :class="i % 2 === 0 ? 'bg-themeOffWhite' : 'bg-white'"
        class="overflow-hidden rounded-md"
      >
        <td class="p-3">Klaudia Warmus</td>
        <td class="p-3">14 October 2020 - 21 October 2020</td>
        <td class="p-3">2 pers</td>
      </tr>
    </tbody>
    <tbody class="grid w-full place-items-center" v-else>
      <p>No reservations yet.</p>
    </tbody>
  </table>
</template>
<script lang="ts">
export default {
  props: {
    reservations: {
      type: Array,
      required: true,
    },
  },

  setup() {
    return {}
  },
}
</script>
